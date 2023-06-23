from flask_sqlalchemy import SQLAlchemy
from .db import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(120), nullable=True)
    address_2 = db.Column(db.String(120), nullable=True)
    city = db.Column(db.String(40), nullable=True)
    state = db.Column(db.String(40), nullable=True)
    country = db.Column(db.String(40), nullable=True)
    zip = db.Column(db.String(20), nullable=True)
    password_hash = db.Column(db.String(256), nullable=False)
    companies = db.relationship('Company', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone": self.phone,
            "address": self.address,
            "address_2": self.address_2,
            "city": self.city,
            "state": self.state,
            "country": self.country,
            "zip": self.zip,
            "companies": [company.serialize() for company in self.companies]
        }