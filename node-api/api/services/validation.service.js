const Joi = require("joi");

const credentialsSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().min(8).required()
});

exports.validateCredentials = credentials =>
  credentialsSchema.validate(credentials).error
    ? credentialsSchema.validate(credentials).error.message
    : null;

exports.validateEmail = email =>
  Joi.string().email().required().validate(email).error
    ? Joi.string().email().required().validate(email).error.message
    : null;
