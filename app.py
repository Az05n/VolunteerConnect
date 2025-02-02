from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import pymongo

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# Database Connection
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["volunteerconnect"]
users_collection = db["users"]

# Signup Route
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    existing_user = users_collection.find_one({"email": data["email"]})

    if existing_user:
        return jsonify({"success": False, "message": "Email already registered!"}), 400

    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    user = {"name": data["name"], "email": data["email"], "password": hashed_password}
    users_collection.insert_one(user)

    return jsonify({"success": True, "message": "Signup successful! Please login."})

# Login Route
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = users_collection.find_one({"email": data["email"]})

    if not user or not bcrypt.check_password_hash(user["password"], data["password"]):
        return jsonify({"success": False, "message": "Invalid email or password!"}), 401

    user_data = {"name": user["name"], "email": user["email"]}
    return jsonify({"success": True, "message": "Login successful!", "user": user_data})

if __name__ == "__main__":
    app.run(debug=True)
@app.route("/post_opportunity", methods=["POST"])
def post_opportunity():
    data = request.json
    opportunity = {
        "title": data["title"],
        "skills": data["skills"].split(", ")
    }
    db.opportunities.insert_one(opportunity)
    return jsonify({"success": True, "message": "Opportunity posted successfully!"})

@app.route("/get_opportunities", methods=["GET"])
def get_opportunities():
    opportunities = list(db.opportunities.find({}, {"_id": 0}))
    return jsonify(opportunities)
