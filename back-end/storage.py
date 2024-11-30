import sqlite3


def connect():
    return sqlite3.connect("C:\\Users\\NIYA\\Desktop\\You'll come tool\\back-end\\app.db")

connection = connect()
connection.execute("PRAGMA foreign_keys = ON;")

# Database interaction example
# 1. create a query (define)
query = """CREATE TABLE IF NOT EXISTS users (
    userId INTEGER PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    is_active INTEGER
    );
"""
# 2. add values to the query (depending on the situation)

# 3. run the query
# 3.1 create a cursor
cursor = connection.cursor()

# 3.2 use the cursor to run the query
cursor.execute(query)

# 4. commit the results (if you update the database)
connection.commit()

# 5. close cursor (optional)
cursor.close()

# 6. close connection (optional)
connection.close()


query = """CREATE TABLE IF NOT EXISTS user_files(
    user_file_id INTEGER PRIMARY KEY AUTOINCREMENT,
    uploaded_image_url VARCHAR,
    selfie_url VARCHAR,
    userId INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
    );
"""
    
    
connection = connect()

connection.execute("PRAGMA foreign_keys = ON;")

cursor = connection.cursor()
cursor.execute(query)
connection.commit()
cursor.close()
connection.close()

query = """CREATE TABLE IF NOT EXISTS trips(
    tripId INTEGER PRIMARY KEY AUTOINCREMENT,
    destination VARCHAR(40) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    ownerId INTEGER NOT NULL,
    flight_options_id INTEGER NOT NULL,
    FOREIGN KEY (ownerId) REFERENCES users(userId),
    FOREIGN KEY (flight_options_id) REFERENCES flight_options(flight_options_id)
    );
"""
    
connection = connect()

connection.execute("PRAGMA foreign_keys = ON;")

cursor = connection.cursor()
cursor.execute(query)
connection.commit()
cursor.close()
connection.close()

query = """CREATE TABLE IF NOT EXISTS flight_options(
    flight_options_id INTEGER PRIMARY KEY AUTOINCREMENT
    );
"""

connection = connect()

connection.execute("PRAGMA foreign_keys = ON;")

cursor = connection.cursor()
cursor.execute(query)
connection.commit()
cursor.close()
connection.close()
   
query = """CREATE TABLE IF NOT EXISTS going_fl(
    goingId INTEGER constraint GOING_PK PRIMARY KEY AUTOINCREMENT,
    depart_city VARCHAR(40) NOT NULL,
    depart_hour VARCHAR(5) NOT NULL,
    arrive_city VARCHAR(40) NOT NULL,
    arrive_hour VARCHAR(5) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    flight_options_id INTEGER NOT NULL,
    FOREIGN KEY (flight_options_id) REFERENCES flight_options(flight_options_id) ON DELETE CASCADE
    );
"""

connection = connect()

connection.execute("PRAGMA foreign_keys = ON;")

cursor = connection.cursor()
cursor.execute(query)
connection.commit()
cursor.close()
connection.close()

  
query = """CREATE TABLE IF NOT EXISTS return_fl(
    returnId INTEGER PRIMARY KEY AUTOINCREMENT,
    depart_city VARCHAR(40) NOT NULL,
    depart_hour VARCHAR(5) NOT NULL,
    arrive_city VARCHAR(40) NOT NULL,
    arrive_hour VARCHAR(5) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    flight_options_id INTEGER NOT NULL,
    FOREIGN KEY (flight_options_id) REFERENCES flight_options(flight_options_id) ON DELETE CASCADE
    );
"""

connection = connect()

connection.execute("PRAGMA foreign_keys = ON;")

cursor = connection.cursor()
cursor.execute(query)
connection.commit()
cursor.close()
connection.close()
  
query = """CREATE TABLE IF NOT EXISTS accomodation(
        accomodationId INTEGER PRIMARY KEY AUTOINCREMENT,
        place VARCHAR(40) NOT NULL,
        price DECIMAL(5,2) NOT NULL,
        link VARCHAR(2083),
        tripId INTEGER NOT NULL,
        FOREIGN KEY (tripId) REFERENCES trips(tripId) ON DELETE CASCADE
    );
"""

connection = connect()

connection.execute("PRAGMA foreign_keys = ON;")

cursor = connection.cursor()
cursor.execute(query)
connection.commit()
cursor.close()
connection.close()
  
query = """CREATE TABLE IF NOT EXISTS extra_transport(
    extra_transport_id INTEGER PRIMARY KEY AUTOINCREMENT,
    tripId INTEGER NOT NULL,
    FOREIGN KEY (tripId) REFERENCES trips(tripId) ON DELETE CASCADE
    );
"""
    
connection = connect()

connection.execute("PRAGMA foreign_keys = ON;")

cursor = connection.cursor()
cursor.execute(query)
connection.commit()
cursor.close()
connection.close()

query = """CREATE TABLE IF NOT EXISTS extra_transport_details(
    extra_transport_detail_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(40) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    extra_transport_id INTEGER NOT NULL,
    FOREIGN KEY (extra_transport_id) REFERENCES extra_transport(extra_transport_id) ON DELETE CASCADE
    );
"""

connection = connect()

connection.execute("PRAGMA foreign_keys = ON;")

cursor = connection.cursor()
cursor.execute(query)
connection.commit()
cursor.close()
connection.close()


