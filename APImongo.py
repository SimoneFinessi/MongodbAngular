
from flask import Flask, jsonify, request
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import pandas as pd
from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}) 
#connect to DB
uri = "mongodb+srv://FinessiSimone:AtlasFinessi@clusters.kkvqs.mongodb.net/?retryWrites=true&w=majority&appName=ClusterS"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
#chose the db
database = client["sample_mflix"]
#chose the collection
users = database["users"]


#127.0.0.1:5000/api/utenti
def serialize_document(doc):
    """Converte gli ObjectId in stringhe per tutti i documenti MongoDB."""
    if doc:
        doc['_id'] = str(doc['_id'])  # Converti l'ObjectId in stringa
    return doc

# verifica se esiste un utente con questo nome e password
@app.route('/api/login/<string:mail>&<string:password>', methods=['GET'])
def get_utenti(mail, password):
    # Validate user credentials
    user = users.find_one({"email": mail, "password": password})
    if not user:
        return jsonify({"error": "Invalid email or password"}), 401
    # If valid, return users
    return jsonify(serialize_document(user)), 200

# registrazione
@app.route('/api/reg', methods=['POST'])
def add_utente():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    if users.find_one({"email": email}):
        return jsonify({"error": "Email already exists"}), 409
     # Crea il nuovo utente
    new_user = {
        "name": username,
        "password": password,
        "email": email
    }
    # Inserisci il nuovo utente nel database
    users.insert_one(new_user)
    
    return jsonify({"message": "User created successfully"}), 201

if __name__ == '__main__':
     app.run(host='0.0.0.0', port=5000, debug=True)