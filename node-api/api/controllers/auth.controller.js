const AuthService = require("../services/auth.service");

exports.auth_login = (req, res, next) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password
  };
  const token = AuthService.login(credentials);
  return res.status(200).json({
    result: "Login successful!",
    token: token
  });
};

exports.auth_signup = (req, res, next) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password
  };
  AuthService.signup(credentials, result => {
    if (result instanceof Error) {
      return next(result);
    }
    return res.status(200).json({
      result: "Signup successful!",
      token: result
    });
  });
};
