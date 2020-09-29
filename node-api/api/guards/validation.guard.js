const ValidationService = require("../services/validation.service");
const { ApiError } = require("../utils/error");

exports.validateCredentials = (req, res, next) => {
  const validationError = ValidationService.validateCredentials({
    email: req.body.email,
    password: req.body.password
  });
  if (validationError) {
    var errors = {};
    validationError.details.forEach(err => {
      errors[err.path[0]] = [err.message];
    });
    return res.status(400).json({
      result: "Invalid data format!",
      dataErrors: errors
    });
  }
  next();
};

exports.validateEmail = (req, res, next) => {
  const validationError = ValidationService.validateEmail(req.params.email);
  if (validationError) {
    var errors = {};
    validationError.details.forEach(err => {
      errors[err.path[0]] = [err.message];
    });
    return res.status(400).json({
      result: "Invalid data format!",
      dataErrors: errors
    });
  }
  next();
};
