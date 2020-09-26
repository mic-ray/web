const ValidationService = require("../services/validation.service");

exports.validateCredentials = (req, res, next) => {
  const validationError = ValidationService.validateCredentials({
    email: req.body.email,
    password: req.body.password
  });
  if (validationError) {
    const error = new Error(validationError);
    error.status = 400;
    return next(error);
  }
  next();
};
