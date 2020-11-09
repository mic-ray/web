# Import SocketIO instance and setup function
from app import socketio, setup
# Import socket events handler
import socket_handler

# Setup an app instance
app = setup()


@app.route("/")
def home():
    return "Hi from Flask"

if __name__ == "__main__":
    socketio.run(app)
