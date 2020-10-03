const Joi = require("joi");

const emailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": `E-Mail should be of type text`,
    "string.empty": `E-Mail can not be empty`,
    "string.email": `E-Mail is not valid`,
    "any.required": `E-Mail is required`
  })
});

const loginCredentialsSchema = emailSchema.append({
  password: Joi.string().trim().min(8).required().messages({
    "string.base": `Password should be of type text`,
    "string.empty": `Password can not be empty`,
    "string.min": `Password has to be at least {#limit} characters long`,
    "any.required": `Password is required`
  })
});

const signupCredentialsSchema = loginCredentialsSchema.append({
  username: Joi.string().trim().min(3).required().messages({
    "string.base": `Username should be of type text`,
    "string.empty": `Username can not be empty`,
    "string.min": `Username has to be at least {#limit} characters long`,
    "any.required": `Username is required`
  })
});

exports.validateSignupCredentials = credentials =>
  signupCredentialsSchema.validate(credentials).error
    ? signupCredentialsSchema.validate(credentials, { abortEarly: false }).error
    : null;

exports.validateLoginCredentials = credentials =>
  loginCredentialsSchema.validate(credentials).error
    ? loginCredentialsSchema.validate(credentials, { abortEarly: false }).error
    : null;

exports.validateEmail = email =>
  emailSchema.validate({ email }).error
    ? emailSchema.validate({ email }, { abortEarly: false }).error
    : null;
