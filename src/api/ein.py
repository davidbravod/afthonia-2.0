from flask_sqlalchemy import SQLAlchemy
from .db import db
from datetime import datetime

class Ein(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    first_name = db.Column(db.String(120), nullable=True)
    last_name = db.Column(db.String(120), nullable=True)
    tax_type = db.Column(db.String(10), nullable=True)
    tax_number = db.Column(db.String(256), nullable=True)
    foreign = db.Column(db.Boolean, nullable=True)
    own_application = db.Column(db.Boolean, nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "company_id": self.company_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "tax_type": self.tax_type,
            "foreign": self.foreign,
            "own_application": self.own_application
        }