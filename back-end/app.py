from sqlite3 import connect
import sqlite3
from flask import Flask, json, render_template, request, Response
from datetime import datetime
from entities import User
from flask_cors import CORS

app = Flask("app")
CORS(app)

# TRIPS_DATA = [
#     {"id": 1, "name": "Trip to Paris", "creator": "Alice", "destination": "Paris", "start_date": "2024-05-01", "end_date": "2024-05-07", "flights": [{"depart_city": "New York", "depart_time": "08:00", "arrive_city": "Paris", "arrive_time": "20:00", "price": "$500"}]},
#     {"id": 2, "name": "Trip to Tokyo", "creator": "Bob", "destination": "Tokyo", "start_date": "2024-06-10", "end_date": "2024-06-20", "flights": [{"depart_city": "Los Angeles", "depart_time": "10:00", "arrive_city": "Tokyo", "arrive_time": "22:00", "price": "$800"}]},
#     # More trips...
# ]

# @app.route('/')
# def index():
#     # Render the index with dashboard content
#     return render_template('dashboard.html', trips=TRIPS_DATA)
    


@app.route("/version", methods=["GET"])
def version():
    return {"version": "1.0.0", "requested_at": str(datetime.now())}


@app.route("/signin", methods=["POST"])
def signin():
    # 1. Receive data
    print(request)
    body = request.json
    print("Request body:", body)

    # 2. Validate data
    if not body or "email" not in body or "password" not in body:
        return Response(
            json.dumps({"error": "Invalid request. Email or password not sent"}),
            status=400,
            headers={"Content-Type": "application/json"},
        )

    email = body['email']
    password = body['password']
    print("Email:", email)
    print("Password:", password)

    try:
        # 3. Check against the stored data
        connection = connect(database="C:\\Users\\NIYA\\Desktop\\You'll come tool\\back-end\\app.db")
        cursor = connection.cursor()

        # 3.1 Get the user data based on provided email
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()

        if not user:
            # User does not exist
            return Response(
                json.dumps({"error": "User does not exist"}),
                status=404,
                headers={"Content-Type": "application/json"},
            )

        # 3.2 Extract user fields from the fetched row
        userId = user[0]
        first_name = user[1]
        email_db = user[3]
        password_db = user[4]

        # 3.3 Check if the provided password matches
        if password != password_db:  # Add password hashing for security
            return Response(
                json.dumps({"error": "Passwords do not match"}),
                status=401,
                headers={"Content-Type": "application/json"},
            )

        # 4. Return a response with user details
        return Response(
            json.dumps({"data": {"email": email_db, "firstName": first_name}}),
            status=200,
            headers={"Content-Type": "application/json"},
        )

    except Exception as e:
        print("Exception occurred:", e)
        return Response(
            json.dumps({"error": f"Something went wrong: {e}"}),
            status=500,
            headers={"Content-Type": "application/json"},
        )

    finally:
        if connection:
            connection.close()



@app.route("/signup", methods=["POST"])
def signup():
    body = request.json
    print("Request body:", body)  


    required_fields = ["firstName", "lastName", "email", "password"]
    for field in required_fields:
        if field not in body or not body[field]:
            return Response(
                json.dumps({"error": f"Missing or empty field: {field}"}),
                status=400,
                headers={"Content-Type": "application/json"},
            )

    user_data = {
        "first_name": body.get("firstName"),  
        "last_name": body.get("lastName"),   
        "email": body.get("email"),
        "password": body.get("password"), 
        "created_at": datetime.now().timestamp(),
    }

    print("User data to insert:", user_data)

    try:
        connection = connect(database="C:\\Users\\NIYA\\Desktop\\You'll come tool\\back-end\\app.db")
        cursor = connection.cursor()

        cursor.execute(
            "INSERT INTO users (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, ?)",
            (
                user_data['first_name'],
                user_data['last_name'],
                user_data['email'],
                user_data['password'], 
                user_data['created_at'],
            ),
        )
        connection.commit()
        new_user_id = cursor.lastrowid  

        return Response(
            json.dumps({"data": {"id": new_user_id, "first_name": user_data['first_name']}}),
            status=200,
            headers={"Content-Type": "application/json"},
        )
    except sqlite3.IntegrityError as e:
        print("Integrity error:", e)  
        return Response(
            json.dumps({"error": "User with this email already exists."}),
            status=400,
            headers={"Content-Type": "application/json"},
        )
    except Exception as e:
        print("Error during query execution:", e)  
        return Response(
            json.dumps({"error": f"Something went wrong. Cause: {e}."}),
            status=500,
            headers={"Content-Type": "application/json"},
        )
    finally:
        if connection:
            connection.close()

    
# def signup():
#     body = request.json
#     user = User()
#     connection = None

#     try:
#         connection = connect(database='app.db')
#         user.from_dict(body)
#         user.get_by_email(dbconnection=connection, email=user.email)

#         if user.id is not None:
#             return Response(
#                 json.dumps({"error": "User already exists"}),
#                 status=400,
#                 headers={"Content-Type": "application/json"},
#             )

#         user.is_active = 1
#         user.created_at = datetime.now().timestamp()
#         user.updated_at = user.created_at

#         user.insert(dbconnection=connection)
#         user.get_by_email(dbconnection=connection, email=user.email)

#         response = Response(
#             json.dumps({"data": {"id": user.id, "first_name": user.first_name}}),
#             status=200,
#             headers={"Content-Type": "application/json"},
#         )
#     except Exception as e:
#         print(e)
#         response = Response(
#             json.dumps({"error": f"Something went wrong. Cause: {e}."}),
#             status=400,
#             headers={"Content-Type": "application/json"},
#         )
#     finally:
#         if connection:
#             connection.close()

#     return response


if __name__ == "__main__":
    app.run(port=5001)
