import sqlite3

def connect():
    return sqlite3.connect("C:\\Users\\NIYA\\Desktop\\You'll come tool\\back-end\\app.db")

connection = connect()

# Database interaction example
# 1. create a query (define)
query = """CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
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
import sqlite3

def connect():
 return sqlite3.connect("C:\\Users\\NIYA\\Desktop\\Web applications\\rau-webapps-24-25\\CSE\\dimitrova-niya\\back-end\\app.db")

connection = connect()

# Database interaction example
# 1. create a query (define)
#create userfiles table
query = """CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
# 3.1. create a cursor 
cursor = connection.cursor()

# 3.2. use the cursor to run the query 
cursor.execute(query)

# 4. commit the results (if you update the database)
connection.commit()

# 5. close cursor (optional, ideal)
cursor.close() 

# 6. close connection (optional, ideal)
connection.close()



query = """CREATE TABLE IF NOT EXISTS user_files(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uploaded_image_url VARCHAR,
    selfie_url VARCHAR,
    user_id INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
    );"""
    
    
connection = connect()
cursor = connection.cursor()
cursor.execute(query)
connection.commit()
cursor.close()
connection.close()