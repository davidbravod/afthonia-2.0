from flask_sqlalchemy import SQLAlchemy
from .db import db
from datetime import datetime

class Email(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    email_address = db.Column(db.String(120), nullable=False)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    third_party_id = db.Column(db.String(120), unique=True)

    def serialize(self):
        return {
            "id": self.id,
            "company_id": self.company_id,
            "email_address": self.email_address,
            "created_date": self.created_date,
            "third_party_id": self.third_party_id
        }