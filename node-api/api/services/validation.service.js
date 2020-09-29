const Joi = require("joi");
const UsersService = require("../services/users.service");

const emailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": `E-Mail should be of type text`,
    "string.empty": `E-Mail can not be empty`,
    "string.email": `E-Mail is not valid`,
    "any.required": `E-Mail is required`,
    "any.external": `E-Mail is already taken`
  })
});

const credentialsSchema = emailSchema.append({
  password: Joi.string().min(8).required().messages({
    "string.base": `Password should be of type text`,
    "string.empty": `Password can not be empty`,
    "string.min": `Password has to be at least {#limit} characters long`,
    "any.required": `Password is required`
  })
});

exports.validateCredentials = credentials =>
  credentialsSchema.validate(credentials).error
    ? credentialsSchema.validate(credentials, { abortEarly: false }).error
    : null;

exports.validateEmail = email =>
  emailSchema.validate({ email }).error
    ? emailSchema.validate({ email }, { abortEarly: false }).error
    : null;
