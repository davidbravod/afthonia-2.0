from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from .db import db


class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    type = db.Column(db.String(120), nullable=False)
    formation_state = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    designator = db.Column(db.String(10), nullable=False)
    activity = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), nullable=True)
    address_2 = db.Column(db.String(120), nullable=True)
    city = db.Column(db.String(40), nullable=True)
    state = db.Column(db.String(40), nullable=True)
    country = db.Column(db.String(40), nullable=True)
    zip = db.Column(db.String(20), nullable=True)
    registration_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    status = db.Column(db.String(120), nullable=False, default="pending")
    third_party_id = db.Column(db.String(120), unique=True)
    shares = db.Column(db.Integer, nullable=True)
    shares_value = db.Column(db.Float, nullable=True)
    president = db.Column(db.String(80), nullable=True)
    secretary = db.Column(db.String(80), nullable=True)
    treasurer = db.Column(db.String(80), nullable=True)
    is_paid = db.Column(db.Boolean, default=False, nullable=False)
    subscription_id = db.Column(db.String(120), unique=True)
    registered_agents = db.relationship('RegisteredAgent', backref='company', lazy=True)
    owners = db.relationship('Owner', backref='company', lazy=True)
    documents = db.relationship('Document', backref='company', lazy=True)
    hostings = db.relationship('Hosting', backref='company', lazy=True)
    domains = db.relationship('Domain', backref='company', lazy=True)
    emails = db.relationship('Email', backref='company', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "type": self.type,
            "formation_state": self.state,
            "name": self.name,
            "designator": self.designator,
            "activity": self.activity,
            "address": self.address,
            "address_2": self.address_2,
            "city": self.city,
            "state": self.state,
            "country": self.country,
            "zip": self.zip,
            "registration_date": self.registration_date,
            "status": self.status,
            "third_party_id": self.third_party_id,
            "shares": self.shares,
            "shares_value": self.shares_value,
            "president": self.president,
            "secretary": self.secretary,
            "treasurer": self.treasurer,
            "is_paid": self.is_paid,
            "subscription_id": self.subscription_id
        }