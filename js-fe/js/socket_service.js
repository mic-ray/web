/**
 * Setups SocketIO connection to server
 *
 * @return {*} Promise, which resolves if connection was successful
 */

var socket;

function connectSocket() {
  socket = io("ws://127.0.0.1:5000");
  return new Promise((resolve, reject) => {
    socket.on("connect", () => {
      resolve("Connected");
      initHandlers(socket);
    });
    socket.on("error", () => {
      reject("Connection error");
    });
  });
}

/**
 * Initializes handlers for socket events
 *
 * @param {*} socket Instance of connected socket which will receive events
 */
function initHandlers() {
  socket.on("greet", data => {
    outputMessage(data.data, false);
  });
  socket.on("chat-message", data => {
    outputMessage(data.data, false);
  });
}

function outputMessage(msg, self) {
  var messageWrapper = document.getElementById("message-wrapper");
  var message = document.createElement("div");
  message.classList.add("message");
  if (self) message.classList.add("message-self");
  message.textContent = msg;
  messageWrapper.append(message);
}

function sendMessage(msg) {
  socket.send(msg);
  outputMessage(msg, true);
}

export {connectSocket, sendMessage};
