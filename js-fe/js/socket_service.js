/**
 * Setups SocketIO connection to server
 *
 * @return {*} Promise, which resolves if connection was successful
 */

function connectSocket() {
  var socket = io("ws://127.0.0.1:5000");
  return new Promise((resolve, reject) => {
    socket.on("connect", () => {
      resolve("Connected");
      initHandlers(socket);
      socket.send("Hello!");
    });
    socket.on("error", () => {
      reject("Error");
    });
  });
}

/**
 * Initializes handlers for socket events
 *
 * @param {*} socket Instance of connected socket which will receive events
 */
function initHandlers(socket) {
  socket.on("greet", data => {
    outputMessage(data.data);
  });
}

function outputMessage(msg) {
  document.getElementsByClassName("messageContainer")[0].style.display =
    "block";
  var messageList = document.getElementById("messageList");
  var message = document.createElement("li");
  message.textContent = msg;
  messageList.append(message);
}

export default connectSocket;
