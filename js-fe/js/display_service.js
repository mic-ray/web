var messageWrapper = document.getElementById("message-wrapper");

function displayMessage(msgData, self = false) {
  var messageContainer = document.createElement("div");
  var username = document.createElement("div");
  var message = document.createElement("div");

  messageContainer.classList.add("message");
  if (self) messageContainer.classList.add("message-self");
  username.classList.add("message-user");

  username.textContent = msgData.user;
  message.textContent = msgData.msg;

  messageContainer.append(username, message);
  messageWrapper.append(messageContainer);
}

export { displayMessage };
