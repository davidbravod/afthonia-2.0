from flask_sqlalchemy import SQLAlchemy
from .db import db

class RegisteredAgent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    first_name = db.Column(db.String(40), nullable=True)
    last_name = db.Column(db.String(40), nullable=True)
    company_name = db.Column(db.String(120), nullable=True)
    address = db.Column(db.String(120), nullable=True)
    address_2 = db.Column(db.String(120), nullable=True)
    city = db.Column(db.String(40), nullable=True)
    state = db.Column(db.String(40), nullable=True)
    country = db.Column(db.String(40), nullable=True)
    zip = db.Column(db.String(20), nullable=True)
    phone = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    third_party_id = db.Column(db.String(120), unique=True)

    def serialize(self):
        return {
            "id": self.id,
            "company_id": self.company_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "company_name": self.company_name,
            "address": self.address,
            "address_2": self.address_2,
            "city": self.city,
            "state": self.state,
            "country": self.country,
            "zip": self.zip,
            "phone": self.phone,
            "email": self.email,
            "third_party_id": self.third_party_id
        }