import os
import urllib
import webapp2

import time
from google.appengine.api import images
from google.appengine.ext.webapp import template
from google.appengine.api import users
from google.appengine.ext import db
#from google.appengine.ext.db import djangoforms
from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers

	
class FileInfo(db.Model):
	blob = blobstore.BlobReferenceProperty(required=True)
	#blob = db.BlobProperty(default=None)
	uploaded_by = db.UserProperty(required=True)	
	userID = db.StringProperty()
	uploaded_at = db.DateTimeProperty(required=True, auto_now_add=True)
	filename = db.StringProperty()
	filetype = db.StringProperty()
	filesize = db.IntegerProperty()

 
from google.appengine.ext.db import stats
 
class BlobInfo(db.Expando):
  @classmethod
  def kind(cls):
    return '__BlobInfo__'
 

class MainHandler(webapp2.RequestHandler):
  def get(self):
  
	user = users.get_current_user()
	
	# All valid image formats for the GAE Images service.
	images = ('image/bmp', 'image/jpeg', 'image/png', 
    'image/gif', 'image/tiff', 'image/x-icon')
		
	if user:

		user_files = FileInfo.all().filter('userID =', user.user_id())		
		
		#put in a div called <action> not null or something then say if action, give that div visibility in css and style it
		html = template.render('templates/index.html', {'user':user, 'logout_url': users.create_logout_url('/')})
		
		user_files = user_files.fetch(1000)	
			
		for file in user_files:		
			if file.blob.content_type in images:
				image = images.get_serving_url(file.blob.key(), size=150, crop=False, secure_url=True)
			else:
				image = 'static/img/file.png'
			html = html + template.render('templates/file.html', {'file':file.blob, 'key':file.blob.key(), 'afile':user_files, 'image':image})
			
		upload_url = blobstore.create_upload_url('/upload')
		html = html + template.render('templates/footer.html', {'upload_url' : upload_url})
		
		self.response.out.write(html)
	else:
		self.redirect(users.create_login_url(self.request.uri))


class Upload(blobstore_handlers.BlobstoreUploadHandler):
  def post(self):
	
	#try:
	upload_files = self.get_uploads('file')  # 'file' is file upload field in the form
	blob_info = upload_files[0]
	#add thumbnail to file info
	file_info = FileInfo(blob=blob_info.key(),filename=blob_info.filename,filetype=blob_info.content_type,filesize=blob_info.size,uploaded_by=users.get_current_user(),userID=users.get_current_user().user_id())
	db.put(file_info)
	time.sleep(3) # wait for 10s to allow for entry to be added so it displays on redirect
	self.redirect('/')
    #except:
        #create failure notice, possibly on top of page where upload notification goes
		#self.redirect('/upload_failure.html')
	
	
class Download(blobstore_handlers.BlobstoreDownloadHandler):
  def post(self):
	download_files = self.request.get_all('thisFile')
	self.response.write(str(download_files) + "<hr>")
	for blob in download_files:
		#have to get the blob key from the db entry field before this
		resource = str(urllib.unquote(blob))
		blob_info = blobstore.BlobInfo.get(resource)
		#add this to the notification window at the top
		#to get multiple file downloads, zipping them is needed		
		self.send_blob(blob_info, save_as=blob_info.filename)

	
class Delete(webapp2.RequestHandler):
	def post(self):
		blob_key = self.request.get('thisFile')
		if not blob_key:
			self.redirect('/')
		else:
			resource = str(urllib.unquote(blob_key))
			blob_info = blobstore.BlobInfo.get(resource)
			user = users.get_current_user()
			user_files = FileInfo.all().filter('userID =', user.user_id())
			user_files = user_files.fetch(1000)	
			for file in user_files:
				if str(file.blob.key()) in blob_key:				
					db.delete(file)
					blobstore.delete(file.blob.key())
			time.sleep(3) # wait for 10s to allow for entry to be deletec on server
			self.redirect('/')

		
class About(webapp2.RequestHandler):
	def get(self):
		user = users.get_current_user()
		html = template.render('templates/about.html', {'user':user, 'logout_url': users.create_logout_url('/')})	
		self.response.out.write(html)
		
app = webapp2.WSGIApplication([('/', MainHandler),
                               ('/upload', Upload),
							   ('/download',Download),
							   ('/delete', Delete),
							   ('/about', About),
							   ],
                              debug=True)

