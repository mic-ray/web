const http = require("http");
const app = require("./api/app");

const server = http.createServer(app);
const port = process.env.PORT || 5000;

server.listen(port);
console.log("Server listening on port:", port);
