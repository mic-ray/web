const gateway = require("fast-gateway");

const PORT = 3000;

/**
 * Middleware for logging incoming requests
 */
const logger = (req, res, next) => {
  console.log(`Received a ${req.method} request on path ${req.path}`);
  next();
};

const server = gateway({
  middlewares: [require("cors")(), logger],
  routes: [
    {
      prefix: "/api/auth",
      prefixRewrite: "/auth",
      target: "http://localhost:3030"
    },
    {
      prefix: "/api/users",
      prefixRewrite: "/users",
      target: "http://localhost:3030"
    },
    {
      prefix: "/api/notes",
      prefixRewrite: "/notes",
      target: "http://localhost:3030"
    },
    {
      prefix: "/api/health",
      prefixRewrite: "/health",
      target: "http://localhost:3030"
    },
    {
      prefix: "/py",
      target: "http://localhost:4000"
    }
  ]
});

server.start(PORT).then(() => console.log("Gateway running on port:", PORT));
