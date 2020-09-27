const ValidationService = require("../services/validation.service");
const { ApiError } = require("../utils/error");

exports.validateCredentials = (req, res, next) => {
  const validationError = ValidationService.validateCredentials({
    email: req.body.email,
    password: req.body.password
  });
  if (validationError) {
    return next(new ApiError(validationError, 400));
  }
  next();
};

exports.validateEmail = (req, res, next) => {
  const validationError = ValidationService.validateEmail(req.params.email);
  if (validationError) {
    return next(new ApiError(validationError, 400));
  }
  next();
};
