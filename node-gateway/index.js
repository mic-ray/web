const gateway = require("fast-gateway");

const PORT = 3000;

gateway({
  middlewares: [require("cors")()],
  routes: [
    {
      prefix: "/auth",
      prefixRewrite: "/auth",
      target: "http://localhost:3030"
    }
  ]
})
  .start(PORT)
  .then(() => console.log("Gateway running on port: ", PORT));
