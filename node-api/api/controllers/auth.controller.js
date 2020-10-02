const AuthService = require("../services/auth.service");

exports.auth_login = (req, res, next) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password
  };
  AuthService.login(credentials).then(
    token => {
      return res.status(200).json({
        result: "Login successful!",
        token: token
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
      return res.status(200).json({
        result: "Signup successful!",
        token: result
      });
    },
    err => next(err)
  );
};
