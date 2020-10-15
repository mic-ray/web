const ValidationService = require("../services/validation.service");

exports.validateSignupCredentials = (req, res, next) => {
  const validationError = ValidationService.validateSignupCredentials({
    email: req.body.email,
    username: req.body.username,
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

exports.validateLoginCredentials = (req, res, next) => {
  const validationError = ValidationService.validateLoginCredentials({
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

exports.validateUsername = (req, res, next) => {
  const validationError = ValidationService.validateUsername(
    req.params.username
  );
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

exports.validateNote = (req, res, next) => {
  const validationError = ValidationService.validateNote(req.body.note);
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
