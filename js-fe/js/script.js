import { connectSocket } from "./socket_service.js";
import sendMessageHandler from "./message_service.js";

var connectBtn = document.getElementById("connect");
var connectStatus = document.createElement("p");
var sendMessage = document.getElementById("message-send");
var usernameInput = document.getElementById("username-input");

function connectHandler() {
  connectBtn.disabled = true;

  // Only add loading info if it
  if (!document.getElementById("status")) {
    connectBtn.after(connectStatus);
    connectStatus.hidden = false;
  }
  var username = usernameInput.value;
  connectSocket(username).then(
    () => {
      document.getElementById("welcome").style.display = "none";
      document.getElementById("chat").style.display = "block";
    },
    err => (connectStatus.textContent = err)
  );
}

function init() {
  connectBtn.addEventListener("click", connectHandler);

  connectStatus.id = "status";
  connectStatus.textContent = "Loading...";
  connectStatus.hidden = true;

  sendMessage.addEventListener("click", sendMessageHandler);
}

init();
