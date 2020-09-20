<template>
  <v-form @submit.prevent="login" v-model="valid">
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
        <v-btn type="submit" :disabled="!valid">Login</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-banner v-if="authStatus">{{ authStatus }}</v-banner>
    </v-row>
  </v-form>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationProvider
  },
  data: () => ({
    email: null,
    password: null,
    valid: false
  }),
  computed: {
    authStatus() {
      return this.$store.getters.getAuthStatus;
    },
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
        }
      ];
    }
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<style></style>
