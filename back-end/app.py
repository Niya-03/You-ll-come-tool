import base64
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
            json.dumps({"data": {"email": email_db, "userId": userId}}),
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
            json.dumps({"data": {"userId": new_user_id, "email": user_data['email']}}),
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

    
@app.route("/add", methods=["POST"])
def add():
    print(request.form)
    destination = request.form.get('destination')
    start_date = request.form.get('beginDate')
    end_date = request.form.get('endDate')
    g_depart_city = request.form.get('goingCity')
    goingDeparture = request.form.get('goingDeparture')
    g_arrive_city = request.form.get('goingArriveCity')
    goingArrival = request.form.get('goingArrival')
    g_price = request.form.get('goingPrice')
    r_depart_city = request.form.get('returnCity')
    returnDeparture = request.form.get('returnDeparture')
    r_arrive_city = request.form.get('returnArrivalCity')
    returnArrival = request.form.get('returnArrival')
    r_price = request.form.get('returnPrice')
    e_trans_name = request.form.get('transportName')
    e_trans_price = request.form.get('transportPrice')
    a_place = request.form.get('accomodationPlace')
    a_price = request.form.get('accomodationPrice')
    a_link = request.form.get('accomodationLink')
    userId = request.form.get('userId')

    g_depart_hour = goingDeparture.split('T')[1]
    g_arrive_hour = goingArrival.split('T')[1]
    r_depart_hour = returnDeparture.split('T')[1]
    r_arrive_hour = returnArrival.split('T')[1]
    tripImageFile = request.files.get('tripImage')
    
    if tripImageFile:
        tripImage = tripImageFile.read()
    else:
        return Response(
            json.dumps({"error": 'no image sent'}),
            status=400,
            headers={"Content-Type": "application/json"},
        )
    
    #checking the dates are correct
    
    try:
        start_date_dt = datetime.fromisoformat(start_date)
        end_date_dt = datetime.fromisoformat(end_date)
        goingDeparture_dt = datetime.fromisoformat(goingDeparture)
        goingArrival_dt = datetime.fromisoformat(goingArrival)
        returnDeparture_dt = datetime.fromisoformat(returnDeparture)
        returnArrival_dt = datetime.fromisoformat(returnArrival)
    except ValueError as e:
        return Response(
            json.dumps({"error": f"Invalid date format: {e}"}),
            status=400,
            headers={"Content-Type": "application/json"}
        )

    errors = []


    if start_date_dt >= end_date_dt:
        errors.append("Start date must be before end date.")


    if goingDeparture_dt >= goingArrival_dt:
        errors.append("Going departure must be before going arrival.")


    if goingDeparture_dt >= returnDeparture_dt:
        errors.append("Going departure must be before return departure.")
    if goingDeparture_dt >= returnArrival_dt:
        errors.append("Going departure must be before return arrival.")


    if returnDeparture_dt >= returnArrival_dt:
        errors.append("Return departure must be before return arrival.")


    if errors:
        return Response(
            json.dumps({"errors": errors}),
            status=400,
            headers={"Content-Type": "application/json"}
        )
        
    #enough checks
    
    try:
        connection = connect(database="C:\\Users\\NIYA\\Desktop\\You'll come tool\\back-end\\app.db")
        cursor = connection.cursor()

        cursor.execute(
            "INSERT INTO trips (destination, start_date, end_date, ownerId, tripImage) VALUES (?, ?, ?, ?, ?)",
            (
                destination, start_date, end_date, userId, tripImage
            )
        )
        connection.commit()
        
        
        tripId = cursor.lastrowid
        tripId2 = tripId
        
        if tripId is None:
            raise ValueError("Failed to retrieve lastrowid for the trip")
                
        connection = connect(database="C:\\Users\\NIYA\\Desktop\\You'll come tool\\back-end\\app.db")
        cursor = connection.cursor()
        
        cursor.execute(
            "INSERT INTO flight_options (tripId) VALUES (?)",
            (tripId,)
        ) 
        
        connection.commit()
        flight_options_id = cursor.lastrowid
        
        connection = connect(database="C:\\Users\\NIYA\\Desktop\\You'll come tool\\back-end\\app.db")
        cursor = connection.cursor()
        
        
        cursor.execute(
            "INSERT INTO going_fl (g_depart_city, g_depart_hour, g_arrive_city, g_arrive_hour, g_price, flight_options_id) VALUES (?, ?, ?, ?, ?, ?)",
            (
                g_depart_city, g_depart_hour, g_arrive_city, g_arrive_hour, g_price, flight_options_id,
            )
        )
        
        connection.commit()
        
        cursor.execute(
            "INSERT INTO return_fl (r_depart_city, r_depart_hour, r_arrive_city, r_arrive_hour, r_price, flight_options_id) VALUES (?, ?, ?, ?, ?,?)",
            (
                r_depart_city, r_depart_hour, r_arrive_city, r_arrive_hour, r_price, flight_options_id,
            )
        )
        
        connection.commit()
        
        
        
        cursor.execute(
            "INSERT INTO accomodation (a_place, a_price, a_link, tripId) VALUES (?, ?, ?, ?)",
            (
                a_place, a_price, a_link, tripId2
            )
        )
        
        connection.commit()
        
        cursor.execute(
            "INSERT INTO extra_transport (tripId) VALUES (?)",
            (
                tripId,
            )
        )
        
        connection.commit()
        
        extra_transport_id = cursor.lastrowid
        
        cursor.execute(
            "INSERT INTO extra_transport_details (e_trans_name,e_trans_price,extra_transport_id) VALUES (?,?,?)",
            (
                e_trans_name, e_trans_price, extra_transport_id
            )
        )
        
        connection.commit()
              
        
        return Response(
            json.dumps({"message": 'lesgo'}),
            status=200,
            headers={"Content-Type": "application/json"},
        )
        
    except Exception as e:
        return Response(
            json.dumps({"error": e}),
            status=500,
            headers={"Content-Type": "application/json"},
        )

    finally:
        if connection:
            connection.close()
            
@app.route("/getAllTrips", methods=["GET"])
def getAllTrips():
    
    try:
        connection = connect(database="C:\\Users\\NIYA\\Desktop\\You'll come tool\\back-end\\app.db")
        cursor = connection.cursor()

        cursor.execute(
            """SELECT trips.*, users.first_name, users.last_name
                FROM trips
                LEFT JOIN users
                ON trips.ownerId = users.userId;"""
        )
        
        rows = cursor.fetchall()

        trips_data = []
        
        
        for row in rows:
            imageBlob = row[5]
            image_base64 = base64.b64encode(imageBlob).decode('utf-8')
            
            trips_data.append({
                "tripId": row[0],
                "destination": row[1], 
                "startDate": row[2],
                "endDate": row[3],
                "ownerId": row[4],
                "image": f"data:image/jpeg;base64,{image_base64}",
                "firstName": row[6],
                "lastName": row[7]
                           
            })
            
        return Response(
                json.dumps({"data": trips_data}),
                status=200,
                headers={"Content-Type": "application/json"},
            )
    except Exception as e:
        return Response(
            json.dumps({"error": e}),
            status=500,
            headers={"Content-Type": "application/json"},
        )
    finally:
        if connection:
            connection.close()

@app.route("/details/<int:tripId>", methods=["GET"])
def getTripDetails(tripId):
    try:
        connection = connect(database="C:\\Users\\NIYA\\Desktop\\You'll come tool\\back-end\\app.db")
        cursor = connection.cursor()

        query = """
            SELECT 
                trips.tripId,
                trips.destination,
                trips.start_date,
                trips.end_date,
                users.first_name AS owner_first_name,
                users.last_name AS owner_last_name,
                trips.tripImage AS trip_image,
                going_fl.g_depart_city,
                going_fl.g_depart_hour,
                going_fl.g_arrive_city,
                going_fl.g_arrive_hour,
                going_fl.g_price,
                return_fl.r_depart_city,
                return_fl.r_depart_hour,
                return_fl.r_arrive_city,
                return_fl.r_arrive_hour,
                return_fl.r_price,
                accomodation.a_place,
                accomodation.a_price,
                accomodation.a_link,
                extra_transport_details.e_trans_name,
                extra_transport_details.e_trans_price
            FROM 
                trips
            LEFT JOIN 
                users ON trips.ownerId = users.userId
            LEFT JOIN 
                flight_options ON trips.tripId = flight_options.tripId
            LEFT JOIN 
                going_fl ON flight_options.flight_options_id = going_fl.flight_options_id
            LEFT JOIN 
                return_fl ON flight_options.flight_options_id = return_fl.flight_options_id
            LEFT JOIN 
                accomodation ON trips.tripId = accomodation.tripId
            LEFT JOIN 
                extra_transport ON trips.tripId = extra_transport.tripId
            LEFT JOIN 
                extra_transport_details ON extra_transport.extra_transport_id = extra_transport_details.extra_transport_id
            WHERE 
                trips.tripId = ?;
            """
        
        cursor.execute(query,(tripId,))
        
        row = cursor.fetchone()
        
        if row:
            
            trip_image_base64 = None
            if row[6]:
                import base64
                trip_image_base64 = base64.b64encode(row[6]).decode("utf-8")

            trip_details = {
                "tripId": row[0],
                "destination": row[1],
                "startDate": row[2],
                "endDate": row[3],
                "ownerFirstName": row[4],
                "ownerLastName": row[5],
                "tripImage": trip_image_base64,
                "goingFlight": {
                    "departCity": row[7],
                    "departHour": row[8],
                    "arriveCity": row[9],
                    "arriveHour": row[10],
                    "price": row[11],
                },
                "returnFlight": {
                    "departCity": row[12],
                    "departHour": row[13],
                    "arriveCity": row[14],
                    "arriveHour": row[15],
                    "price": row[16],
                },
                "accomodation": {
                    "place": row[17],
                    "price": row[18],
                    "link": row[19],
                },
                "extraTransportDetails": {
                    "name": row[20],
                    "price": row[21],
                },
            }

            
            return Response(
                json.dumps({"data": trip_details}),
                status=200,
                headers={"Content-Type": "application/json"},
            )
        else:
            return Response(
            json.dumps({"error": 'Trip not found'}),
            status=404,
            headers={"Content-Type": "application/json"},
        )
        
    except Exception as e:
        return Response(
            json.dumps({"error": e}),
            status=500,
            headers={"Content-Type": "application/json"},
        )
    finally:
        if connection:
            connection.close()

if __name__ == "__main__":
    app.run(port=5001)
