import boto.ec2

key_id = "AKIAIK5DOQ5FI55STIVA"
secret_key = "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"

region = boto.ec2.get_region("eu-west-1", aws_access_key_id=key_id, aws_secret_access_key=secret_key)
conn = boto.connect_ec2(aws_access_key_id=key_id,aws_secret_access_key=secret_key,region=region)

def launch_instance():
	input = ""
	while True:
		input = raw_input("\nLaunch Instance Menu\n\nEnter the OS would you like to start an instance with\n\n 1. Windows\n 2. Linux\n 0. Back\n\n> ").lower()
		if input in ("windows", "w", "win", "1"):
			image = "ami-d4228ea3"
			launch("Windows", image)
		elif input in ("linux", "l", "lin", "2"):
			image = "ami-748e2903"
			launch("Linux", image)
		elif input in ("exit", "e", "b", "back", "0"):
			return
		else:
			print "\n\nInvalid option!\n\n"

def launch(type, image):
	input = raw_input("\nCreate " + type + " instance with image: " + image + "? (Y/N) ").lower()
	if input in ("y", "yes"):
		instance = conn.run_instances(image, key_name="Adam2014", instance_type="t2.micro")
		print "\nStarting new EC2 instance id: %s \n" % instance.id
	else:
		return
				
'''
Line 6: The variable region is set when get_region returns a boto RegionInfo object when passed a region string and key parameters
Line 7: The variable conn is set to an Amazon EC2 connection object by passing the key, secret key and region object to the boto.connect_ec2 method
Line 14: When I was writing this I think Amazon may have changed the AMI of the free tier windows machine so got an error until I updated it so if it generates an error check this. Can't be sure though.
Lines 13-18: Depending on user input set the image variable to either of the options below allowing for abbreviation
Line 27: Instance is set to point to an instance object created using the specified image, key pair and instance type
'''		
		