var messageWrapper = document.getElementById("message-wrapper");

function displaySelfMessage(msg, username) {
  var message = document.createElement("div");
  message.classList.add("message", "message-self");
  message.textContent = `${username}: ${msg}`;
  messageWrapper.append(message);
}

function displayMessage(msgData) {
  var message = document.createElement("div");
  message.classList.add("message");
  message.textContent = `${msgData.user}: ${msgData.msg}`;
  messageWrapper.append(message);
}

export { displaySelfMessage, displayMessage };
