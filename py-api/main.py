from flask import Flask
from flask_socketio import SocketIO, emit
import sys

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")


@app.route("/")
def home():
    return "Hi from Flask"


@socketio.on("connect")
def handle_connect():
    print("Client connected!")
    emit("greet", {"data": "Hi from the Server!"})


@socketio.on("message")
def handle_message(message):
    print("Received a Client message: " + message)


if __name__ == "__main__":
    socketio.run(app)
