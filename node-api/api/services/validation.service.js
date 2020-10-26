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
const usernameSchema = Joi.object({
  username: Joi.string()
    .trim()
    .min(3)
    .max(25)
    .regex(/^[a-z0-9_-]+$/)
    .required()
    .messages({
      "string.base": `Username should be of type text`,
      "string.empty": `Username can not be empty`,
      "string.min": `Username has to be at least {#limit} characters long`,
      "string.max": `Username has to be less than {#limit} characters long`,
      "string.pattern.base": `Username can only contain lowercase letters (a-z), numbers (0-9), underscore (_) and hyphen (-)`,
      "any.required": `Username is required`
    })
});
const signupCredentialsSchema = loginCredentialsSchema.concat(usernameSchema);

const noteSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.base": `Title should be of type text`,
    "string.empty": `Title can not be empty`,
    "any.required": `Title is required`
  }),
  description: Joi.string().trim().messages({
    "string.base": `Description should be of type text`,
    "string.empty": `Description can not be empty`
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

exports.validateUsername = username =>
  usernameSchema.validate({ username }).error
    ? usernameSchema.validate({ username }, { abortEarly: false }).error
    : null;

exports.validateNote = note =>
  noteSchema.validate(note).error
    ? noteSchema.validate(note, { abortEarly: false }).error
    : null;
