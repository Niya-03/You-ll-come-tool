from flask import Flask, json, request, Response
from datetime import datetime
from entities import User

app = Flask("app")


@app.route("/", methods=["GET"])
def home():
    print("Hello")
    return "<h1>hello world</h1>"


@app.route("/version", methods=["GET"])
def version():
    return {"version": "1.0.0", "requested_at": str(datetime.now())}


@app.route("/signin", methods=["GET", "POST"])
def signin():
    # 1. receive data
    print(request)
    body = request.json

    # 2. validate data
    keys = list(body.keys())

    if not "email" in keys:
        return Response(
            json.dumps({"error": "invalid request. email not sent"}),
        )

    # 3. check against the stored data
    # 3.1 get the user data based on provided email

    user = User()
    try:
        user.get_by_email(email=body["email"])
        if user.password == body["password"]:
            response = Response(
                json.dumps({"data": {"id": user.id, "first_name": user.first_name}}),
                status=200,
                headers={"Content-Type": "application/json"},
            )
        else:
            response = Response(
                json.dumps({"error": "User email or password are wrong"}),
                status=400,  # bad request
                headers={"Content-Type": "application/json"},
            )
    except Exception as e:
        response = Response(
            json.dumps({"error": "Failed to get user"}),
            status=404,
            headers={"Content-Type": "application/json"},
        )

    # 3.2 if they exist => check if the user password matches the provided password
    # 3.3 if they match we let them in

    # 4. return a response based on the result obtained at 3.

    return Response({}, {"Content-Type": "application/json"}, 200)


@app.route("/signup", methods=["POST"])
def signup():
    body = request.json
    user = User()

    try:
        user.from_dict(body)
        user.get_by_email(email=user.email)

        if user.id is not None:
            response = Response(
                json.dumps({"error": "User already exists"}),
                status=400,
                headers={"Content-Type": "application/json"},
            )

        user.is_active = 1
        user.created_at = datetime.now().timestamp()
        user.updated_at = user.created_at
        user.insert()
        user.get()
        response = Response(
            json.dumps({"data": {"id": user.id, "first_name": user.first_name}}),
            status=200,
            headers={"Content-Type": "application/json"},
        )
    except Exception as e:
        response = Response(
            json.dumps({"error": f"Something went wrong. Cause: {e}."}),
            status=400,
            headers={"Content-Type": "application/json"},
        )
    return response


if __name__ == "__main__":
    app.run(port=5001)
