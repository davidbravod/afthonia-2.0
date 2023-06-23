"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import io
import uuid
from datetime import datetime
from flask import Flask, request, jsonify, Blueprint, Response, request, make_response, send_file
from sqlalchemy import extract
from api.user import db, User
from api.lead import Lead
from api.company import Company
from api.owner import Owner
from api.registeredagent import RegisteredAgent
from api.ein import Ein
from api.images import Imagen
from api.favoritos import Favoritos
from api.tokenBlockedList import TokenBlockedList
from api.utils import generate_sitemap, APIException
from urllib.parse import quote, unquote

from api.extensions import jwt, bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required, get_jwt
from flask_jwt_extended import JWTManager

import cloudinary
import cloudinary.uploader
import cloudinary.api

import boto3

import openai 

import stripe
stripe.api_key = os.getenv("STRIPE_KEY")

import hashlib
import jwt
import requests

cloudinary.config(
cloud_name = os.getenv("CLOUDINARY_NAME"),
api_key = os.getenv("CLOUDINARY_KEY"),
api_secret = os.getenv("CLOUDINARY_SECRET"),
api_proxy = "http://proxy.server:9999"
)

ACCESS_KEY = os.getenv('ACCESS_KEY')
SECRET_KEY = os.getenv('SECRET_KEY')

openai.api_key = os.environ.get('OPENAI_API_KEY')

S3_BUCKET = os.getenv('S3_BUCKET')
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_REGION = os.getenv('AWS_REGION')

api = Blueprint('api', __name__)

@api.route('/addlead', methods=['POST'])
def add_lead():
    body = request.get_json()
    
    if body is None:
        raise APIException("You need to specify the request body as json object", status_code=400)
    if "email" not in body:
        raise APIException("You need to specify the email", status_code=400)
    if "first_name" not in body:
        raise APIException("You need to specify the name", status_code=400)
    if "last_name" not in body:
        raise APIException("You need to specify the lastname", status_code=400)
    if "phone" not in body:
        raise APIException("You need to specify the phone", status_code=400)
    
    first_name = body["first_name"]
    last_name = body["last_name"]
    email = body["email"]
    phone = body["phone"]
    
    lead = Lead.query.filter_by(email=email).first()
    if lead is not None:
        raise APIException("Email is already registered", status_code=409)
    
    new_lead = Lead(email=email, first_name=first_name, last_name=last_name, phone=phone)

    db.session.add(new_lead)
    db.session.commit()

    return jsonify({"msg":"Lead successfully added"}), 201

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    # Encrypt the password
    password_encrypted = bcrypt.generate_password_hash(data['user']['password'], 10).decode('utf-8')

    # Create a new User
    user = User(
        first_name=data['user']['first_name'],
        last_name=data['user']['last_name'],
        email=data['user']['email'],
        phone=data['user']['phone'],
        password_hash=password_encrypted,
    )
    db.session.add(user)
    db.session.flush()

    # Create a new Company
    company = Company(
        type=data['company']['type'],
        formation_state=data['company']['formation_state'],
        name=data['company']['name'],
        designator=data['company']['designator'],
        activity=data['company']['activity'],
        address=data['company']['address'],
        address_2=data['company']['address_2'],
        city=data['company']['city'],
        state=data['company']['state'],
        country=data['company']['country'],
        zip=data['company']['zip'],
        shares=data['company']['shares'],
        shares_value=data['company']['shares_value'],
        president=data['company']['president'],
        secretary=data['company']['secretary'],
        treasurer=data['company']['treasurer'],
        is_paid=data['company']['is_paid'],
        subscription_id=user.id,
        user_id=user.id
    )
    db.session.add(company)
    db.session.flush()

    # Add Owners
    for owner in data['owners']:
        new_owner = Owner(
            first_name=owner['first_name'],
            last_name=owner['last_name'],
            company_name=owner['company_name'],
            address=owner['address'],
            address_2=owner['address_2'],
            city=owner['city'],
            state=owner['state'],
            country=owner['country'],
            zip=owner['zip'],
            shares_owned=owner['shares_owned'],
            percentage_ownership=owner['percentage_ownership'],
            company_id=company.id,
            user_id=user.id
        )
        db.session.add(new_owner)

    # Add RegisteredAgent
    agent = data['registered_agent']
    registered_agent = RegisteredAgent(
        first_name=agent['first_name'],
        last_name=agent['last_name'],
        company_name=agent['company_name'],
        address=agent['address'],
        address_2=agent['address_2'],
        city=agent['city'],
        state=agent['state'],
        country=agent['country'],
        zip=agent['zip'],
        phone=agent['phone'],
        email=agent['email'],
        company_id=company.id
    )
    db.session.add(registered_agent)

    # Encrypt the ssn or itin importing cryptography.fernet from Fernet:

    # key = Fernet.generate_key()
    # cipher_suite = Fernet(key)

    # tax_encrypted = cipher_suite.encrypt(b"my_tax")
    # Store 'tax_encrypted' in db instead of plain text

    # Later, when you need the original SSN or ITIN, you can decrypt it:
    # tax_decrypted = cipher_suite.decrypt(tax_encrypted)

    # Add Ein
    ein = Ein(
        first_name=data['ein']['first_name'],
        last_name=data['ein']['last_name'],
        tax_type=data['ein']['tax_type'],
        tax_number=data['ein']['tax_number'], # Replace for encrypted one
        foreign=data['ein']['foreign'],
        company_id=company.id
    )
    db.session.add(ein)

    db.session.commit()

    return jsonify({"msg":"Signup successful"}), 201

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email_or_username = body["email_or_username"]
    password = body["password"]
    
    if "email_or_username" not in body:
        raise APIException("You need to specify the email or username", status_code=400)

    if "password" not in body:
        raise APIException("You need to specify the password", status_code=400)

    user = User.query.filter((User.email == email_or_username) | (User.username == email_or_username)).first()

    if user is None:
        return jsonify({"message": "Login failed"}), 401

    
    if not bcrypt.check_password_hash(user.password_hash, password):
        return jsonify({"message": "Login failed"}), 401
    
    # if user.role == 'admin':
    #     return jsonify({"message": "You do not have permissions to access this route"}), 403

    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token}), 200

@api.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"] 
    now = datetime.utcnow()

    
    current_user = get_jwt_identity()
    user = User.query.get(current_user)

    tokenBlocked = TokenBlockedList(token=jti , created_at=now, email=user.email)
    db.session.add(tokenBlocked)
    db.session.commit()

    return jsonify({"message":"logout successfully"})

@api.route('/users', methods=['GET'])
def get_users():
    country_filter = request.args.get('country')
    state_filter = request.args.get('state')
    city_filter = request.args.get('city')
    is_paid_filter = request.args.get('is_paid')
    company_filter = request.args.get('company')

    query = User.query

    if country_filter:
        query = query.filter(User.country == country_filter)
    if state_filter:
        query = query.filter(User.state == state_filter)
    if city_filter:
        query = query.filter(User.city == city_filter)
    if is_paid_filter:
        query = query.filter(User.is_paid == (is_paid_filter.lower() == 'true'))
    if company_filter:
        query = query.join(User.companies).filter(Company.name == company_filter)

    users = query.all()

    return jsonify([user.serialize() for user in users]), 200

@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):

    user = User.query.get(user_id)
    if user is None:
        return jsonify({"error": "User not found"}), 404
    else:
        return jsonify(user.serialize()), 200
    
@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    if data is None:
        return {"error": "No data provided"}, 400

    if 'first_name' in data:
        user.first_name = data['first_name']
    if 'last_name' in data:
        user.last_name = data['last_name']
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'phone' in data:
        user.phone = data['phone']
    if 'address' in data:
        user.address = data['address']
    if 'address_2' in data:
        user.address_2 = data['address_2']
    if 'city' in data:
        user.city = data['city']
    if 'state' in data:
        user.state = data['state']
    if 'country' in data:
        user.country = data['country']
    if 'zip' in data:
        user.zip = data['zip']

    try:
        db.session.commit()
        return {"success": "User updated successfully"}, 200
    except:
        db.session.rollback()
        return {"error": "Something went wrong, try again!"}, 500

@api.route("/companies", methods=["GET"])
def get_companies():
    companies = Company.query

    designator = request.args.get('designator', default=None, type=str)
    if designator:
        companies = companies.filter(Company.designator == designator)

    activity = request.args.get('activity', default=None, type=str)
    if activity:
        companies = companies.filter(Company.activity == activity)

    status = request.args.get('status', default=None, type=str)
    if status:
        companies = companies.filter(Company.status == status)

    registration_start_date = request.args.get('registration_start_date', default=None, type=str)
    registration_end_date = request.args.get('registration_end_date', default=None, type=str)
    if registration_start_date and registration_end_date:
        start_date = datetime.strptime(registration_start_date, '%Y-%m-%d')
        end_date = datetime.strptime(registration_end_date, '%Y-%m-%d')
        companies = companies.filter(Company.registration_date.between(start_date, end_date))

    registration_month = request.args.get('registration_month', default=None, type=int)
    if registration_month:
        companies = companies.filter(extract('month', Company.registration_date) == registration_month)

    registration_year = request.args.get('registration_year', default=None, type=int)
    if registration_year:
        companies = companies.filter(extract('year', Company.registration_date) == registration_year)

    return jsonify([c.serialize() for c in companies.all()])

@api.route('/companies/<int:company_id>', methods=['GET'])
def get_company(company_id):
    company = Company.query.get(company_id)
    if company is None:
        return jsonify({"error": "Company not found"}), 404

    return jsonify(company.serialize()), 200

@api.route('/companies/<int:company_id>', methods=['PUT'])
def update_company(company_id):
    company = Company.query.get(company_id)
    if company is None:
        return {"error": "Company not found"}, 404

    data = request.get_json()
    if data is None:
        return {"error": "No data provided"}, 400

    if 'user_id' in data:
        company.user_id = data['user_id']
    if 'type' in data:
        company.type = data['type']
    if 'formation_state' in data:
        company.formation_state = data['formation_state']
    if 'name' in data:
        company.name = data['name']
    if 'designator' in data:
        company.designator = data['designator']
    if 'activity' in data:
        company.activity = data['activity']
    if 'address' in data:
        company.address = data['address']
    if 'address_2' in data:
        company.address_2 = data['address_2']
    if 'city' in data:
        company.city = data['city']
    if 'state' in data:
        company.state = data['state']
    if 'country' in data:
        company.country = data['country']
    if 'zip' in data:
        company.zip = data['zip']
    if 'status' in data:
        company.status = data['status']
    if 'shares' in data:
        company.shares = data['shares']
    if 'shares_value' in data:
        company.shares_value = data['shares_value']
    if 'president' in data:
        company.president = data['president']
    if 'secretary' in data:
        company.secretary = data['secretary']
    if 'treasurer' in data:
        company.treasurer = data['treasurer']
    if 'is_paid' in data:
        company.is_paid = data['is_paid']
    if 'subscription_id' in data:
        company.subscription_id = data['subscription_id']
    if 'third_party_id' in data:
        company.third_party_id = data['third_party_id']

    try:
        db.session.commit()
        return {"success": "Company updated successfully"}, 200
    except:
        db.session.rollback()
        return {"error": "Something went wrong, try again!"}, 500


@api.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    data = request.get_json()
    line_items = data.get("line_items")
    email = data.get("email")
    try:
        
        checkout_session = stripe.checkout.Session.create(
            customer_email = email,
            line_items = line_items,
            mode = "subscription",
            success_url = "http://localhost:3000/user/successpayment",
            cancel_url = "http://localhost:3000/user/cancelpayment",
            allow_promotion_codes = True,
        )
    except Exception as e:
        return {"error": str(e)}, 400
    
    return {"id": checkout_session.id}

@api.route('/stripe-session', methods=['POST'])
def get_session():
    session_id = request.json.get('session_id')
    session = stripe.checkout.Session.retrieve(session_id)
    return jsonify(session)

@api.route('/corporatetools/documents', methods=['GET'])
def get_documents():
    path = "/documents"
    body = ""
    
    headers = {"access_key": ACCESS_KEY}
    payload = {
        "path": path,
        "content": hashlib.sha256(body.encode('ascii')).hexdigest()
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256', headers=headers)

    try:
        url = "https://api.corporatetools.com/documents?status=read"
        headers = {"Authorization": f'Bearer {token}', "Content-Type": "application/json"}
        r = requests.get(url, headers=headers, data=body)

        if r.status_code != 200:
            print(f"Error: got status code {r.status_code} with content: {r.content}")
            return jsonify({"error": f"Got status code {r.status_code}"}), 401
        else:
            return jsonify(r.json())
    except Exception as e:
        print(f"Error: {e}")
        raise e

@api.route('/corporatetools/documents/<string:company_id>', methods=['GET'])
def get_company_documents(company_id):
    path = "/documents"
    body = ""
    
    headers = {"access_key": ACCESS_KEY}
    payload = {
        "path": path,
        "content": hashlib.sha256(body.encode('ascii')).hexdigest()
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256', headers=headers)

    try:
        url = f"https://api.corporatetools.com/documents?status=read&company_id={company_id}"
        headers = {"Authorization": f'Bearer {token}', "Content-Type": "application/json"}
        r = requests.get(url, headers=headers, data=body)
        if r.status_code != 200:
            print(f"Error: got status code {r.status_code} with content: {r.content}")
            return jsonify({"error": f"Got status code {r.status_code}"}), 401
        response_data = r.json()
        read_docs = response_data.get('result')

        url = f"https://api.corporatetools.com/documents?status=unread&company_id={company_id}"
        headers = {"Authorization": f'Bearer {token}', "Content-Type": "application/json"}
        r = requests.get(url, headers=headers, data=body)
        if r.status_code != 200:
            print(f"Error: got status code {r.status_code} with content: {r.content}")
            return jsonify({"error": f"Got status code {r.status_code}"}), 401
        response_data = r.json()
        unread_docs = response_data.get('result')

        all_docs = unread_docs + read_docs

        return jsonify(all_docs)
    except Exception as e:
        print(f"Error: {e}")
        raise e

@api.route('/corporatetools/documents/<int:user_id>', methods=['GET'])
def get_user_documents(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"error": "User not found"}), 404
    
    third_party_ids = [company.third_party_id for company in user.companies]

    path = "/documents"
    body = ""
    
    headers = {"access_key": ACCESS_KEY}
    payload = {
        "path": path,
        "content": hashlib.sha256(body.encode('ascii')).hexdigest()
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256', headers=headers)
    all_docs = []

    try:
        for third_party_id in third_party_ids:
            url = f"https://api.corporatetools.com/documents?status=read&company_id={third_party_id}"
            headers = {"Authorization": f'Bearer {token}', "Content-Type": "application/json"}
            r = requests.get(url, headers=headers, data=body)
            if r.status_code != 200:
                print(f"Error: got status code {r.status_code} with content: {r.content}")
                return jsonify({"error": f"Got status code {r.status_code}"}), 401
            response_data = r.json()
            read_docs = response_data.get('result')

            url = f"https://api.corporatetools.com/documents?status=unread&company_id={third_party_id}"
            headers = {"Authorization": f'Bearer {token}', "Content-Type": "application/json"}
            r = requests.get(url, headers=headers, data=body)
            if r.status_code != 200:
                print(f"Error: got status code {r.status_code} with content: {r.content}")
                return jsonify({"error": f"Got status code {r.status_code}"}), 401
            response_data = r.json()
            unread_docs = response_data.get('result')

            all_docs += unread_docs + read_docs

        return jsonify(all_docs)
        
    except Exception as e:
        print(f"Error: {e}")
        raise e
    
@api.route('/corporatetools/download/<string:id>', methods=['GET'])
def download_document(id):
    path = f"/documents/{id}/download"
    body = ""
    
    headers = {"access_key": ACCESS_KEY}
    payload = {
        "path": path,
        "content": hashlib.sha256(body.encode('ascii')).hexdigest()
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256', headers=headers)

    try:
        url = f"https://api.corporatetools.com/documents/{id}/download"
        headers = {"Authorization": f'Bearer {token}', "Content-Type": "application/json"}
        r = requests.get(url, headers=headers, data=body)

        if r.status_code != 200:
            print(f"Error: got status code {r.status_code} with content: {r.content}")
            return jsonify({"error": f"Got status code {r.status_code}"}), 401
        else:
            response = Response(r.content, mimetype='application/pdf')
            response.headers.set('Content-Disposition', 'attachment', filename=f'{id}.pdf')
            return response
    except Exception as e:
        print(f"Error: {e}")
        raise e

@api.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part in the request', 400

    file = request.files['file']

    if file.filename == '':
        return 'No selected file', 400
    
    random_name = str(uuid.uuid4())
    file_extension = file.filename.rsplit('.', 1)[1].lower()
    
    file_name = f"{random_name}.{file_extension}"

    try:
        s3 = boto3.client('s3', region_name=AWS_REGION,
                          aws_access_key_id=AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
        s3.upload_fileobj(file, S3_BUCKET, file_name)
        file_path = f'https://{S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{file_name}'
        return jsonify({'file_path': file_path}), 200
    except Exception as e:
        print(e)
        return 'Error uploading file', 500

@api.route('/download', methods=['POST'])
def download_file():
    data = request.get_json()
    filepath = data.get("filepath")
    file_name = unquote(filepath.split('/')[-1])
    try:
        s3_client = boto3.client('s3')
        download_path = f"/tmp/{file_name}"
        s3_client.download_file(S3_BUCKET, file_name, download_path)
        
        response = make_response(send_file(download_path, mimetype='application/pdf'))
        response.headers.set('Content-Disposition', 'attachment', filename=file_name)
        
        return response
    except Exception as e:
        return str(e)

@api.route('/namegenerator', methods=['POST'])
def name_generator():
    body = request.get_json()    
    prompt = f"You are a branding consultant specialized in generating unique and brandable names for new companies. Your task today is to generate the possible names for a company that provides the following services: {body['prompt']} targeted to the following audience: {body['prompt_2']}"

    completion = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        n=1,
        max_tokens=2048
    )

    message = completion.choices[0].text
    message = message.replace("\n", ", ")

    response = {
        "message": message.strip()
    }
    return jsonify(response), 200

@api.route('/chatsupport', methods=['POST'])
def chat_support():
    body = request.get_json()    
    prompt = "You are a LLC formation company, please respond to any doubt the user have accordingly: " + body['prompt']

    completion = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        n=1,
        max_tokens=2048
    )

    message = completion.choices[0].text
    message = message.replace("\n", ", ")

    response = {
        "message": message.strip()
    }
    return jsonify(response), 200


"""
@api.route('/upload', methods=['POST'])
def handle_upload():

    if 'image' not in request.files:
        raise APIException("No image to upload")

    print("FORMA DEL ARCHIVO: \n",  request.files['image'])
    my_image = Imagen()

    result = cloudinary.uploader.upload(
        request.files['image'],
        public_id=f'sample_folder/profile/my-image-name',
        crop='limit',
        width=450,
        height=450,
        eager=[{
            'width': 200, 'height': 200,
            'crop': 'thumb', 'gravity': 'face',
            'radius': 100
        },
        ],
        tags=['profile_picture']
    )

    my_image.ruta = result['secure_url']
    my_image.user_id = 1 # Aquí debería extraer del token, el id del usuario
    db.session.add(my_image) 
    db.session.commit()

    return jsonify(my_image.serialize()), 200

@api.route('/image-list', methods=['GET'])
def handle_image_list():
    images = Imagen.query.all() #Objeto de SQLAlchemy
    images = list(map(lambda item: item.serialize(), images))

    response_body={
        "lista": images
    }
    return jsonify(response_body), 200
"""
# MPT-7b : 64k tokens, ggml, q4_0, 128bits 4Q 
# Oobaboonga, Koboldcpp
