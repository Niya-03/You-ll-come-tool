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
    is_active INTEGER,
    is_admin INTEGER DEFAULT 0
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

#inserting admin
query = """INSERT INTO users (first_name, last_name, email, password, is_admin) VALUES('admin', 'admin', 'admin@mail.com', '1234567890', 1);
"""
connection = connect()
cursor = connection.cursor()
cursor.execute(query)
connection.commit()
cursor.close()
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
    destination VARCHAR(40) ,
    start_date DATE,
    end_date DATE ,
    ownerId INTEGER ,
    tripImage BLOB,
    FOREIGN KEY (ownerId) REFERENCES users(userId)
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
    flight_options_id INTEGER PRIMARY KEY AUTOINCREMENT,
    tripId INTEGER,
    FOREIGN KEY (tripId) REFERENCES trips(tripId)
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
    g_depart_city VARCHAR(40) ,
    g_depart_hour VARCHAR(5) ,
    g_depart_date VARCHAR(10),
    g_arrive_city VARCHAR(40) ,
    g_arrive_hour VARCHAR(5) ,
    g_arrive_date VARCHAR(10),
    g_price DECIMAL(5,2) ,
    flight_options_id INTEGER ,
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
    r_depart_city VARCHAR(40) ,
    r_depart_hour VARCHAR(5) ,
    r_depart_date VARCHAR(10),
    r_arrive_city VARCHAR(40) ,
    r_arrive_hour VARCHAR(5) ,
    r_arrive_date VARCHAR(10),
    r_price DECIMAL(5,2) ,
    flight_options_id INTEGER ,
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
        a_place VARCHAR(40),
        a_price DECIMAL(5,2),
        a_link VARCHAR(2083),
        tripId INTEGER,
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
    tripId INTEGER ,
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
    e_trans_name VARCHAR(40) ,
    e_trans_price DECIMAL(5,2) ,
    extra_transport_id INTEGER ,
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

query = """CREATE TABLE IF NOT EXISTS goingList(
    tripId INTEGER ,
    userId INTEGER ,
    FOREIGN KEY (tripId) REFERENCES trips(tripId) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
    PRIMARY KEY(tripId, userId)
    );
"""

connection = connect()

connection.execute("PRAGMA foreign_keys = ON;")

cursor = connection.cursor()
cursor.execute(query)
connection.commit()
cursor.close()
connection.close()
