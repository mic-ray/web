const outputMessage = msg => {
  document.getElementsByClassName("messageContainer")[0].style.display =
    "block";
  var messageList = document.getElementById("messageList");
  var message = document.createElement("li");
  message.textContent = msg;
  messageList.append(message);
};

const connectWS = () => {
  var socket = io("ws://127.0.0.1:5000");

  socket.on("connect", () => {
    connectStatus.textContent = "Connected!";
    socket.send("Hello!");
  });

  socket.on("greet", data => {
    console.log("received", data);
    outputMessage(data.data);
  });
};

const connectHandler = () => {
  connectBtn.disabled = true;

  // Only add loading info if it
  if (!document.getElementById("status")) {
    connectBtn.after(connectStatus);
    connectStatus.hidden = false;
  }

  connectWS();
};

var connectBtn = document.getElementById("connect");
connectBtn.addEventListener("click", connectHandler);

var connectStatus = document.createElement("p");
connectStatus.id = "status";
connectStatus.textContent = "Loading...";
connectStatus.hidden = true;
