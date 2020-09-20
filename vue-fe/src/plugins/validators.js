import { extend } from "vee-validate";
import { required, email, min } from "vee-validate/dist/rules";

extend("email", email);
extend("min", {
  ...min,
  message: `{_field_} has to be at least 8 characters`
});
extend("required", {
  ...required,
  message: "{_field_} is required"
});
extend("passwordMatch", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Passwords don't match"
});
