import { sendMessage } from "./socket_service.js";
function sendMessageHandler() {
  var messageInput = document.getElementById("message-input");
  sendMessage(messageInput.value);
}

export default sendMessageHandler;
