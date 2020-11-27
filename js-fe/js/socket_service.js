/**
 * Setups SocketIO connection to server
 *
 * @return {*} Promise, which resolves if connection was successful
 */

import { displayMessage } from "./display_service.js";

var socket;

function connectSocket(username) {
  socket = io("ws://127.0.0.1:5000");
  return new Promise((resolve, reject) => {
    socket.on("connect", () => {
      socket.user = username;
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
    displayMessage({ user: "Server", msg: data.data });
  });
  socket.on("chat-message", data => {
    displayMessage(data.data);
  });
}

function sendMessage(msg) {
  socket.send({
    user: socket.user,
    msg: msg
  });
  displayMessage({ user: socket.user, msg: msg }, true);
}

export { connectSocket, sendMessage };
