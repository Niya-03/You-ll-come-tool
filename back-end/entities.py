from datetime import datetime

from flask import json


class User:
    def __init__(self):
        self.id = None 
        self.first_name = None 
        self.last_name = None 
        self.dob = None
        self.gender = None 
        self.phone = None 
        self.email = None 
        self.password = None 
        self.created_at = None 
        self.updated_at = None 
        self.is_active = None
    
    def is_password_valid(self):
        if self.password is None or len(self.password) < 8:
            return False 
        return True 
    
    def get_by_email(self, dbconnection, table_name="users",email=None):
        assert email is not None
        query = f"""SELECT * FROM {table_name} WHERE email = {email}"""
        cursor = dbconnection.cursor()
        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()
        dbconnection.close()
        self.from_tuple(result)
        return self 
    
    def insert(self, dbconnection, table_name="users"):
        query = f"""
        INSERT INTO {table_name} (
            first_name, 
            last_name, 
            dob, 
            gender, 
            phone, 
            email, 
            password, 
            created_at, 
            updated_at,
            is_active
        ) 
        VALUES (
            '{self.first_name}', 
            '{self.last_name}', 
            {self.dob}, 
            {self.gender}, 
            '{self.phone}', 
            '{self.email}', 
            '{self.password}', 
            {self.created_at}, 
            {self.updated_at},
            {self.is_active}
        );""" 
        cursor = dbconnection.cursor()
        cursor.execute(query)
        dbconnection.commit()
        cursor.close()
        dbconnection.close()

    def from_tuple(self, user_tuple):
        assert len(user_tuple) == 11
        self.id = user_tuple[0]
        self.first_name = user_tuple[1]
        self.last_name = user_tuple[2]
        self.dob = user_tuple[3]
        self.gender = user_tuple[4]
        self.phone = user_tuple[5]
        self.email = user_tuple[6]
        self.password = user_tuple[7]
        self.created_at = user_tuple[8]
        self.updated_at = user_tuple[9]
        self.is_active = user_tuple[10]
        return self

    def from_dict(self, user_dict):
        self.id = user_dict["id"]
        self.first_name = user_dict["first_name"]
        self.last_name = user_dict["last_name"]
        self.dob = user_dict["dob"]
        self.gender = user_dict["gender"]
        self.phone = user_dict["phone"]
        self.email = user_dict["email"]
        self.password = user_dict["password"]
        self.created_at = user_dict["created_at"]
        self.updated_at = user_dict["updated_at"]
        self.is_active = user_dict["is_active"]
        return self 

    def from_json(self, user_json):
        user_dict = json.loads(user_json)
        return self.from_dict(user_dict)
    
    def to_dict(self):
        user_dict = {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "dob": self.dob,
            "gender": self.gender,
            "phone": self.phone,
            "email": self.email,
            # "password": self.password,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
        return user_dict
    
    def to_json(self):
        return json.dumps(self.to_dict())

    def get(self, dbconnection, table_name="users"):
        query = f"""SELECT * FROM {table_name} WHERE id = {self.id}""" 
        cursor = dbconnection.cursor()
        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()
        dbconnection.close()
        self.from_tuple(result)
        return self 

    def update(self, dbconnection, table_name="users"):
        query = f"""UPDATE {table_name}
        SET first_name = '{self.first_name}', 
            last_name = '{self.last_name}', 
            dob = {self.dob}, 
            gender = {self.gender}, 
            phone = '{self.phone}', 
            email = '{self.email}', 
            password = '{self.password}', 
            created_at = {self.created_at}, 
            updated_at =  {self.updated_at}
        WHERE id = {self.id}""" 
        cursor = dbconnection.cursor()
        cursor.execute(query)
        dbconnection.commit()
        cursor.close()
        dbconnection.close()
          
    def delete(self, dbconnection, table_name="users"):
        query = f"""DELETE FROM {table_name} WHERE id = {self.id}""" 
        cursor = dbconnection.cursor()
        cursor.execute(query)
        dbconnection.commit()
        cursor.close()
        dbconnection.close()
        print("deleted succesfully")
        
    def deleteAll(self, dbconnection, table_name="users"):
        query = f"""DELETE FROM {table_name}"""
        cursor = dbconnection.cursor()
        cursor.execute(query)
        dbconnection.commit()
        cursor.close()
        dbconnection.close()


class UserFile:
    def __init__(self):
        self.id = None
        self.uploaded_image_url = None 
        self.selfie_url = None 
        self.user_id = None 
        self.created_at = None 
        self.updated_at = None  
    
    def insert(self, dbconnection, table_name="user_files"):
        query = f"""
        INSERT INTO {table_name} (
            uploaded_image_url, 
            selfie_url, 
            user_id, 
            created_at, 
            updated_at 
        ) 
        VALUES ( 
            '{self.uploaded_image_url}', 
            '{self.selfie_url}', 
            {self.user_id},  
            {self.created_at}, 
            {self.updated_at}
        );""" 
        cursor = dbconnection.cursor()
        cursor.execute(query)
        dbconnection.commit()
        cursor.close()
        dbconnection.close()
        
    def from_tuple(self, user_tuple):
        self.id = user_tuple[0]
        self.uploaded_image_url = user_tuple[1]
        self.selfie_url = user_tuple[2]
        self.user_id = user_tuple[3]
        self.created_at = user_tuple[4]
        self.updated_at = user_tuple[5]
        return self
    
    def from_json(self, user_json):
        user_dict = json.loads(user_json)
        return self.from_dict(user_dict)
    
    def to_json(self):
        return json.dumps(self.to_dict())
    
    def to_dict(self):
        user_dict = {
            "id": self.id,
            "uploaded_image_url": self.uploaded_image_url,
            "selfie_url": self.selfie_url,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
        return user_dict
    
    def from_dict(self, user_dict):
        self.id = user_dict["id"]
        self.uploaded_image_url = user_dict["uploaded_image_url"]
        self.selfie_url = user_dict["selfie_url"]
        self.user_id = user_dict["user_id"]
        self.created_at = user_dict["created_at"]
        self.updated_at = user_dict["updated_at"]
        return self 

    def get(self, dbconnection, table_name="user_files"):
        query = f"""SELECT * FROM {table_name} WHERE id = {self.id}""" 
        cursor = dbconnection.cursor()
        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()
        dbconnection.close()
        return self 

    def update(self):
        pass 

    def delete(self):
        pass 


if __name__ == "__main__":
    from storage import connect

    user = User()
    user.first_name = "User 1 FN"
    user.last_name = "User 1 LN"
    user.email = "user1@email.com"
    user.phone = "+748777777"
    user.is_active = 1
    user.password = "123456789"
    user.created_at = datetime.now().timestamp()
    user.updated_at = datetime.now().timestamp()
    user.dob = datetime.now().timestamp()
    user.gender = 0

    connection = connect()
    user.insert(connection)

    connection = connect()
    user.id = 1
    u = user.get(connection)
    print(u) 
    
    print(u.to_dict())
    print(u.to_json())
    
    
    file = UserFile()
    file.uploaded_image_url = "123456"
    file.selfie_url="83478297489237498"
    file.user_id = 1
    file.created_at = datetime.now().timestamp()
    file.updated_at = datetime.now().timestamp()
    
    connection = connect()
    file.insert(connection)
    connection = connect()
    file.id = 1
    f = file.get(connection)
    print(f) 
    print(f.to_dict())
    print(f.to_json())
    # user.first_name = "Malcho"
    # connection = connect()
    # user.update(connection)
    
    # connection = connect()
    # u = user.get(connection)
    # print(u) 
    
    # user.last_name = "Malchov"
    # connection = connect()
    # user.update(connection)
 
    # connection = connect()
    # u = user.get(connection)
    # print(u) 
    
    # connection = connect()
    # user.deleteAll(connection)
    
    # connection = connect()
    # u = user.get(connection)
    # print(u) 
    
    
    