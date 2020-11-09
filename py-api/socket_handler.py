from app import socketio
from flask_socketio import emit


@socketio.on("connect")
def handle_connect():
    print("Client connected!")
    emit("greet", {"data": "Hi from the Server!"})


@socketio.on("message")
def handle_message(message):
    print("Received a Client message: " + message)