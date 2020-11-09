from flask import Flask
from flask_socketio import SocketIO

# Setup SocketIO instance
socketio = SocketIO(cors_allowed_origins="*")


def setup():
    """Setups and returns an instance of the Flask app"""
    app = Flask(__name__)
    socketio.init_app(app)
    return app
