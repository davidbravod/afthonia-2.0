from flask_sqlalchemy import SQLAlchemy
from .db import db
from datetime import datetime

class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    document_type = db.Column(db.String(120), nullable=False)
    file_path = db.Column(db.String(120), nullable=False)
    upload_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def serialize(self):
        return {
            "id": self.id,
            "company_id": self.company_id,
            "document_type": self.document_type,
            "file_path": self.file_path,
            "upload_date": self.upload_date
        }