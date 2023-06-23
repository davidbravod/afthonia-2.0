from flask_sqlalchemy import SQLAlchemy
from .db import db
from datetime import datetime

class Hosting(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    hosting_plan = db.Column(db.String(120), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end_date = db.Column(db.DateTime)
    third_party_id = db.Column(db.String(120), unique=True)

    def serialize(self):
        return {
            "id": self.id,
            "company_id": self.company_id,
            "hosting_plan": self.hosting_plan,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "third_party_id": self.third_party_id
        }