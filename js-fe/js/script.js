import connectSocket from "./socket_service.js";

var connectBtn = document.getElementById("connect");
var connectStatus = document.createElement("p");

function connectHandler() {
  connectBtn.disabled = true;

  // Only add loading info if it
  if (!document.getElementById("status")) {
    connectBtn.after(connectStatus);
    connectStatus.hidden = false;
  }

  connectSocket().then(
    res => (connectStatus.textContent = res),
    err => (connectStatus.textContent = err)
  );
}

function init() {
  connectBtn.addEventListener("click", connectHandler);

  connectStatus.id = "status";
  connectStatus.textContent = "Loading...";
  connectStatus.hidden = true;
}

init();
