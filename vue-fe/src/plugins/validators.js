import { extend, setInteractionMode } from "vee-validate";
import { required, min } from "vee-validate/dist/rules";
import api from "@/utils/api";

setInteractionMode("eager");

extend("email", {
  validate(value) {
    return /[^@]+@.+\.[a-z]+/.test(value);
  },
  message: "{_field_} is not valid"
});
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
extend("emailAvailable", {
  validate(value) {
    return api.get("users/check/" + value).then(
      () => true,
      err => {
        // Only return false, if the status
        // represents a conflict
        if (err.response.status === 409) return false;
        return true;
      }
    );
  },
  message: "E-Mail is already used"
});
