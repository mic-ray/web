import { extend } from "vee-validate";
import { required, email, min } from "vee-validate/dist/rules";

extend("email", email);
extend("min", {
  ...min,
  params: ["length"],
  message: `{_field_} has to be at least {length} characters long`
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
