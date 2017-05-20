
from google.appengine.ext import db
_FINS = ['Falcate','Triangular','Rounded']
_WHALES = ['Humpback','Blue','Killer', 'Fin', 'Gray', 'Sperm', 'Beluga', 'Gros']
_BLOWS = ['Tall','Bushy','Something else']
_WAVES = ['Flat','Small','Moderate', 'Large', 'Breaking', 'High']

class Sighting(db.Model):
    name =       db.StringProperty()
    email =      db.StringProperty()
    date =       db.StringProperty()
    time =       db.StringProperty()
    location =   db.StringProperty(multiline=True)
    fin_type =   db.StringProperty(choices=_FINS)
    whale_type = db.StringProperty(choices=_WHALES)
    blow_type =  db.StringProperty(choices=_BLOWS)
    wave_type =  db.StringProperty(choices=_WAVES)
