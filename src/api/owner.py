from flask_sqlalchemy import SQLAlchemy
from .db import db


class Owner(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    first_name = db.Column(db.String(40), nullable=True)
    last_name = db.Column(db.String(40), nullable=True)
    company_name = db.Column(db.String(120), nullable=True)
    address = db.Column(db.String(120), nullable=True)
    address_2 = db.Column(db.String(120), nullable=True)
    city = db.Column(db.String(40), nullable=True)
    state = db.Column(db.String(40), nullable=True)
    country = db.Column(db.String(40), nullable=True)
    zip = db.Column(db.String(20), nullable=True)
    role = db.Column(db.String(120), nullable=True)
    shares_owned = db.Column(db.Integer, nullable=True)
    percentage_ownership = db.Column(db.Integer, nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "company_id": self.company_id,
            "user_id": self.user_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "company_name": self.company_name,
            "address": self.address,
            "address_2": self.address_2,
            "city": self.city,
            "state": self.state,
            "country": self.country,
            "zip": self.zip,
            "role": self.role,
            "shares_owned": self.shares_owned,
            "percentage_ownership": self.percentage_ownership
        }