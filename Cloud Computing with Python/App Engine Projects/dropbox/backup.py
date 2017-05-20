import os
import urllib
import webapp2
import jinja2

from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class MainHandler(webapp2.RequestHandler):
  def get(self):
	all = blobstore.BlobInfo.all()
	upload_url = blobstore.create_upload_url('/upload')
	self.response.out.write('<html><head><title>Project</title><link type="text/css" rel="stylesheet" href="static/style/main.css" /></head><body>')
	self.response.out.write('<h2>Stored files</h2>')
	for blob in all:		
		self.response.out.write('<div class="file-box">%s | %s | %s | %s Bytes<input type="checkbox" name="file" value="%s"></div>' %(blob.filename,blob.creation,blob.content_type,blob.size, blob.key()) )
		self.response.out.write('<a href="%s">Download</a></body></html>')
	self.response.out.write('<form action="%s" method="POST" enctype="multipart/form-data">' % upload_url)
	self.response.out.write("""Upload File: <input type="file" name="file"><br> <input type="submit"
        name="submit" value="Submit"> </form>""")
	template_values = {
        'blobs': all,
		'upload_url' : upload_url,
        }

	template = JINJA_ENVIRONMENT.get_template('index.html')
	self.response.write(template.render(template_values))
	

class UploadHandler(blobstore_handlers.BlobstoreUploadHandler):
  def post(self):
    try:
		upload_files = self.get_uploads('file')  # 'file' is file upload field in the form
		blob_info = upload_files[0]
		self.redirect('/confirm/%s' % blob_info.key())
    except:
        self.redirect('/upload_failure.html')

class ServeHandler(blobstore_handlers.BlobstoreDownloadHandler):
  def get(self, resource):
    resource = str(urllib.unquote(resource))
    blob_info = blobstore.BlobInfo.get(resource)
    self.response.out.write('Downloading: ', blob_info.filename)
	#self.send_blob(blob_info, save_as=blob_info.filename)
	
class DeleteFile(webapp2.RequestHandler):
	pass

class Uploadconfirm(webapp2.RequestHandler):
	def get(self, resource):
		resource = str(urllib.unquote(resource))
		blob_info = blobstore.BlobInfo.get(resource)
		self.response.out.write('Successfully uploaded %s' % blob_info.filename)

app = webapp2.WSGIApplication([('/', MainHandler),
                               ('/upload', UploadHandler),
                               ('/serve/([^/]+)?', ServeHandler),
							   ('/confirm/([^/]+)?', Uploadconfirm)],
                              debug=True)

