const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password
  };
  console.log(credentials);
  return res.status(200).json({
    message: "Signed in!"
  });
});

module.exports = { authRoutes: router };
