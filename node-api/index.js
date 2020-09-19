const http = require("http");
const app = require("./api/app");

const server = http.createServer(app);

server.listen(process.env.PORT || 5000);
