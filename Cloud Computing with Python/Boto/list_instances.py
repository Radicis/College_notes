import boto
import boto.ec2
from boto.s3.connection import S3Connection
from boto.s3.key import Key
import boto.ec2.cloudwatch
import boto.cloudtrail
from boto.ec2.cloudwatch import MetricAlarm
import boto.sns
import datetime
import boto.utils
import argparse
import sys
import json
import gzip
import StringIO

key_id = "AKIAIK5DOQ5FI55STIVA"
secret_key = "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"

region = boto.ec2.get_region("eu-west-1", aws_access_key_id=key_id, aws_secret_access_key=secret_key)

conn = boto.connect_ec2(aws_access_key_id=key_id,aws_secret_access_key=secret_key,region=region)

parser = argparse.ArgumentParser()
parser.add_argument("-i", "-id", dest="listId", help="List the instance IDs", action="store_true")
parser.add_argument("-tp", "-type", dest="listType", help="List the instance types", action="store_true")
parser.add_argument("-r", "-region", dest="listRegion", help="List the instance regions", action="store_true")
parser.add_argument("-tm", "-time", dest="listTime", help="List the instance launch times", action="store_true")
args = parser.parse_args()				
				
def monitorRunning():	
	i = 0
	print "\nRunning AWS EC2 instances:\n"	
	for reservation in conn.get_all_reservations():
		for instance in reservation.instances:			
			if instance.state == u'running':				
				if not len(sys.argv)>1:
					print i, ":", instance.id, "-", instance.instance_type, "(",  instance.region, ")  : (Running since:", instance.launch_time, ")"
				else:						
					print "\n",i,
					if args.listId:
						print ":", instance.id,
					if args.listType:
						print ":", instance.instance_type,
					if args.listRegion:
						print ": (", instance.region, ")",
					if args.listTime:
						print ": (Running since:", instance.launch_time, ")"				
				i +=1

def listBuckets():
	s3_conn = S3Connection(key_id,secret_key)	
	buckets = s3_conn.get_all_buckets()	
	print "\n\nCurrent AWS S3 Buckets:\n"
	for bucket in buckets:			
		print "\n\tName: ", bucket.name, "Created: ", bucket.creation_date

def setAlarm():	
	sns = boto.sns.connect_to_region('eu-west-1',aws_access_key_id=key_id, aws_secret_access_key=secret_key )	
	cw = boto.ec2.cloudwatch.connect_to_region("eu-west-1", aws_access_key_id=key_id, aws_secret_access_key=secret_key)
	
	print "\nEnabling Cloudwatch monitoring on running instances..\n"	
	
	topics = sns.get_all_topics()	
	
	topic = topics[u'ListTopicsResponse']['ListTopicsResult']['Topics'][0]['TopicArn']
	
	emailAddr = raw_input("Please enter an email address to receive alarm notifications: ")
	
	print "\nSNS email address set to %s\n" % emailAddr	
	any_running = False	
	for reservation in conn.get_all_reservations():		
		for instance in reservation.instances:						
			if instance.state == u'running':				
				any_running = True;
				conn.monitor_instance(instance.id)
				
				alarm_name = 'CPU Utilization < 40 for instance: %s' %instance.id 				
				alarm_dimensions = {"InstanceId": instance.id}	
				alarm = MetricAlarm(name = alarm_name, comparison='<', threshold=40, period=300, evaluation_periods=2,namespace='AWS/EC2', metric='CPUUtilization', statistic='Average', alarm_actions=[topic], dimensions = alarm_dimensions)
				cw.create_alarm(alarm)
				print "Alarm set for instance: %s" % instance.id
				sns.subscribe(topic, "email", emailAddr)				
		if not any_running:
			print "\nNo running instances found. No alarm set."
				
def getCloudTrail():	
	ctconn = boto.cloudtrail.connect_to_region("eu-west-1", aws_access_key_id=key_id, aws_secret_access_key=secret_key)
	s3_conn = S3Connection(key_id,secret_key)
	buckets = s3_conn.get_all_buckets()	
	
	trail =  ctconn.describe_trails()

	if trail == "":	
		print "No cloudtrail found for this region on this account.\nPlease set one up from the AWS dashboard."		
	else:
		input = 1
		while True:
			input = raw_input("\n\nCloudtrail found\n\nWhat would you like to do?\n\n 1. Start\n 2. Stop\n 3. View recent activity\n 4. Check for unauthorised access\n 0. Back\n\n > ").lower()
			if input in ("1", "start"):			
				ctconn.start_logging('Default')
			elif input in ("2", "stop"):			
				ctconn.stop_logging('Default')
			elif input in ("3", "view"):				
				getCtRecent(buckets)
			elif input in ("4", "u", "unauthorised"):			
				checkLogs(buckets)
			elif input in ("exit", "e", "b", "back", "0"):
				return
			else:
				print "\nInvalid option!"

def getCtRecent(buckets):		
	ct_name = "cloudtrailadam"
	
	for bucket in buckets:	
		if bucket.name == ct_name:
			for key in bucket:
				pass
			f = StringIO.StringIO()
			key.get_file(f)
			f.seek(0, 0)
			gzfile = gzip.GzipFile(fileobj=f)
			data = gzfile.read()
			
			print "\nRecent Activity:\n-------------------------------------------------------------------"

			j = json.loads(data)
			parent = j["Records"]
			for item in parent:
				print item["sourceIPAddress"], item["userIdentity"]["type"], item["userIdentity"]["accountId"], item["eventName"], item["eventTime"]
					
			print "--------------------------------------------------------------------\n"
				
def checkLogs(buckets):

	ignoredId = []

	ct_name = "cloudtrailadam"
	
	for bucket in buckets:	
		if bucket.name == ct_name:			
			for key in bucket:
				if not key.name.endswith('/'):					
					f = StringIO.StringIO()					
					key.get_file(f)
					f.seek(0, 0)
					gzfile = gzip.GzipFile(fileobj=f)
					data = gzfile.read()
					j = json.loads(data)
					parent = j["Records"]					
					for item in parent:
						if item['userIdentity']['accountId'] not in ignoredId: 
							print "\nAccess from unknown account: ", item['userIdentity']['accountId'],  " found!\n"
							print "Event Details: ", item["sourceIPAddress"], item["userIdentity"]["type"], item["userIdentity"]["accountId"], item["eventName"], item["eventTime"]
							
							while(True):
								input = raw_input("\nDo you wish to ignore events from this account ID? (Y/N) ").lower()							
								if input in ('yes', 'y', 'ye'):
									ignoredId.append(item['userIdentity']['accountId'])
									break
								elif input in ('no', 'n', '0'):								
									input = raw_input("Do you wish to be notified of the first event of this ID via email? (Y/N) > ").lower()
									if input in ('yes', 'y', 'ye'):	
										emailAddr = raw_input("Please enter an email address to receive alarm notifications: ")
										sns = boto.sns.connect_to_region("eu-west-1", aws_access_key_id=key_id, aws_secret_access_key=secret_key)
										topics = sns.get_all_topics()
										topic = topics[u'ListTopicsResponse']['ListTopicsResult']['Topics'][0]['TopicArn']
										msg = "Event details -  Source IP: " + str(item["sourceIPAddress"]) + " :  Account ID: " + str(item["userIdentity"]["accountId"]) + " :  Event type: " + str(item["eventName"]) + " :  Event time: " +  str(item["eventTime"])
										subject = "Unauthorised account access"
										sns.publish(topic, msg, subject)
										sns.subscribe(topic, "email", emailAddr)
										ignoredId.append(item['userIdentity']['accountId'])
										break
									elif input in ('no', 'n', '0'):
										break
									else:
										print "Invalid command"
								else:
									print "Invalid command"
					
	print "\n\nCheck complete\n"
					
	
'''
Line 20: The variable region is set when get_region returns a BOTO RegionInfo object when passed a region string and key parameters
Line 22: The variable "conn" is set to an Amazon EC2 connection object by passing the key, secret key and region object to the boto.connect_ec2 method

Line 24: Set up Argparse object
Line 25-28: Populate the parser with optional arguments using the add_argument method
Line 29: Invoke the parse_args method to convert the arguments into an object with the specified attributes

Line 32: Counter variable only used for display purposes
Line 34: Iterate through the list of reservation objects returned by get_all_reservations()	
		 This method returns a list of all EC2 instance objects
Line 35: Iterate through each instance in reservation.instances and determine if they are running
Line 36: If their state is set to 'running' then print out the instance details
Line 37: If no arguments are passed then display all information
Line 40-48: print out the details based on passed argument flags (true or false)

Line 51: Method to list all S3 buckets	
Line 52: An S3 connection object is constructed by passing in the key and secret key variables
Line 52: Buckets is set to point to the list of bucket objects returned from .get_all_buckets
Line 55-57: iterate through the list of buckets and print out the details

Line58: Method to set up clod watch monitoring and SNS metric alarms
Line 59: An SNS connection object is created by passing the region, key and secret key to the connection_to_region() method
Line 60: A cloudwatch connection object is created by passing the region, key and secret key to the connection_to_region() method
Line 64: Invoke the get_all_topics method to return a dictionary containing all topic arns on the account
Line 66: Get the first [0] topic arm from the dictionary

Line 72: Iterate through the list of reservation objects returned by get_all_reservations() This method returns a list of all EC2 instance objects
Line 73: Iterate through all instances in reservation
Line 74: Set boolean to alert use if no running instances found
Line 75: For any instances that have their state set to running	
Line 76: Call the monitor_instance method on the EC2 connection object with the specified instance id to enable monitoring
Line 79: Set the dimensions for the alarm using the current instance id
Line 80: Set up the alarm by passing in relevant arguments to the Metric alarm method
		Notable arguments would be threshold being the % to check against and dimensions being the instances to activate the alarm on
Line 81: Create the alarm by passing the MetricAlarm object to the create_alarm method
Line 83: Subscribe to the alarm using the specified email address and the email protocol

Line 89: A cloudtrails connection object is created by passing the region, key and secret key to the connection_to_region() method
Line 90: An S3 connection object is constructed by passing in the key and secret key variables
Line 91: Buckets is set to point to the list of bucket objects returned from .get_all_buckets
Line 93: describe_trails returns a dictionary of information relating to the cloudtrail on the connected account
Line 95: If no cloudtrail is active on this account in this region alert user
Line 96: Validating a bucket name and related availability checks to set up a cloudtrails bucket would have been a bit much to get done so advise user to set it up manually. 
		 The name of the bucket you create must be entered into the getCtRecent method below once created.	
Line 102: Start cloudtrails logging on the account/region
Line 104: Stop cloudtrails logging on the account/region
Line 106: Pass the buckets list to the method checkRecent
Line 108: Pass the buckets list to the method checkLogs

Line 114: Method to display recent cloudtrails logs and check for unauthorised access
Line 115: Set the name of your cloudTrails bucket
Line 117: Iterate through buckets and find the cloudtrail bucket
Line 119: Iterate though all keys in the bucket such that "key" points to the last one which is the last created log file
Line 121: Construct an empty StringIO buffer object
Line 122: Using the boto s3 method get_file, retrieve the file from the S3 key and place the data in the StringIO buffer
Line 123: Set the position of the read/write pointer to the beginning of the file
Line 124: Construct a new GzipFile object and pass it the file object contained in the StringIO buffer f
Line 125: get the data from the file using pythons .read method
Line 129: Pass the data to the .loads method in the json library which returns an object 
Line 130: Set the parent key from the JSON to look for keys within the main key
Line 131: Iterate through the parent key 
Line 132: Print out relevant key values

Line 136: Parses all keys in the cloudtrails bucket and checks all events against a given account ID to check for unauthorised access
Line 138: Set ignored id list, add your own account ID here	
Line 140: Set the name of our cloudTrails bucket
Line 142: Iterate through buckets and find the cloudtrail bucket
Line 145: Check if key is a file and not a folder by checking the end of the path
Line 146: Construct an empty StringIO object
Line 147: Using the boto s3 method get_file, retrieve the file from the S3 key and place the data in the StringIO buffer
Line 148: Set the position of the read/write pointer to the beginning of the file
Line 149: Construct a new GzipFile object and pass it the file object contained in the StringIO buffer f
Line 150: get the data from the file using pythons .read method
Line 151: Pass the data to the .loads method in the json library which returns an object 
Line 152: Set the parent key from the JSON to look for keys within the main key
Line 153: Iterate though the json parent key again
Line 154: If the accountId of any event does not any of the IDs contained in ignoredList one.
Line 156: print the details of the event
Line 161: Add the event account ID to the list of ignored IDs
Line 166: Set up email address
Line 167: Create SNS connection object by passing the region, key and secret key
Line 168: Pull all of the topic ARNs on the account and store them in topics
Line 169: Get the first topic ARN and store it in topic
Line 170: Set up email message body to contain event information
Line 171: Set up email message subject
Line 172: Publish this message to SNS
Line 173: Subscribe to the alarm using the specified email address and the email protocol
Line 174: Add ID to ignored list to continue checking for other unauthorised accounts
'''	
		