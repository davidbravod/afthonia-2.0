from flask_sqlalchemy import SQLAlchemy
from .db import db
from datetime import datetime

class Domain(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    domain_name = db.Column(db.String(120), nullable=False)
    registration_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    expiry_date = db.Column(db.DateTime)
    third_party_id = db.Column(db.String(120), unique=True)

    def serialize(self):
        return {
            "id": self.id,
            "company_id": self.company_id,
            "domain_name": self.domain_name,
            "registration_date": self.registration_date,
            "expiry_date": self.expiry_date,
            "third_party_id": self.third_party_id
        }