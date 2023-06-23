  
import os
from flask_admin import Admin
from .user import db, User
from .images import Imagen
from .favoritos import Favoritos
from .company import Company
from .owner import Owner
from .registeredagent import RegisteredAgent
from .lead import Lead
from .ein import Ein
from .document import Document
from .hosting import Hosting
from .domain import Domain
from .email import Email
from flask_admin.contrib.sqla import ModelView


from flask_admin.menu import MenuCategory, MenuView, MenuLink

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='Afthonia Enterprises LLC', template_mode='bootstrap3')

    
    # Add your models here:
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Imagen, db.session))
    admin.add_view(ModelView(Company, db.session))
    admin.add_view(ModelView(Owner, db.session))
    admin.add_view(ModelView(RegisteredAgent, db.session))
    admin.add_view(ModelView(Lead, db.session))
    admin.add_view(ModelView(Ein, db.session))
    admin.add_view(ModelView(Document, db.session))
    admin.add_view(ModelView(Hosting, db.session))
    admin.add_view(ModelView(Domain, db.session))
    admin.add_view(ModelView(Email, db.session))


    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
    admin.add_link(MenuLink(name='Home Page Backend', url='/'))