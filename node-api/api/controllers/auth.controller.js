const AuthService = require("../services/auth.service");

exports.auth_login = (req, res, next) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password
  };
  AuthService.login(credentials).then(
    result => {
      return res.status(200).json({
        result: "Login successful!",
        user: result
      });
    },
    err => next(err)
  );
};

exports.auth_signup = (req, res, next) => {
  const credentials = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };

  AuthService.signup(credentials).then(
    result => {
      return res.status(201).json({
        result: "Signup successful!",
        user: result
      });
    },
    err => next(err)
  );
};

exports.auth_check = (req, res) => {
  // If a user obejct was set on the request
  if (req.user) {
    // The token check succeeded
    return res.status(200).json({
      result: "Auth check successful"
    });
  }
  // Otherwise it failed
  return res.status(401).json({
    result: "Auth check failed"
  });
};
