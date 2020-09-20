<template>
  <ValidationObserver>
    <v-form @submit.prevent v-model="valid">
      <v-row justify="center" v-for="(field, i) in formFields" :key="i">
        <v-col cols="auto">
          <ValidationProvider
            :name="field.label"
            :rules="field.rules.join('|')"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="field.model"
              :type="field.type"
              :label="field.label"
              :error-messages="errors"
              required
              outlined
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn type="submit" :disabled="!valid">Signup</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </ValidationObserver>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },

  data: () => ({
    email: null,
    password: null,
    passwordConfirm: null,
    valid: false
  }),
  computed: {
    formFields() {
      return [
        {
          model: this.email,
          rules: ["required", "email"],
          type: "email",
          label: "E-Mail"
        },
        {
          model: this.password,
          rules: ["required", "min:8"],
          type: "password",
          label: "Password"
        },
        {
          model: this.passwordConfirm,
          rules: ["passwordMatch:@Password"],
          type: "password",
          label: "Confirm Password"
        }
      ];
    }
  }
};
</script>

<style></style>
