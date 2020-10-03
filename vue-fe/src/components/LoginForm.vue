<template>
  <div>
    <v-row justify="center">
      <v-col cols="auto">
        <v-alert v-if="alertError.active" dismissible outlined type="error">
          {{ alertError.message }}
        </v-alert>
      </v-col>
    </v-row>
    <ValidationObserver ref="form">
      <v-form @submit.prevent="handleSubmit">
        <v-row justify="center" v-for="(field, i) in formFields" :key="i">
          <v-col cols="auto">
            <ValidationProvider
              :name="field.label"
              :rules="field.rules.join('|')"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="models[field.model]"
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
            <v-btn type="submit">Login</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    formFields: [
      {
        model: "email",
        rules: ["required", "email"],
        type: "email",
        label: "E-Mail"
      },
      {
        model: "password",
        rules: ["required", "min:8"],
        type: "password",
        label: "Password"
      }
    ],
    models: {
      email: null,
      password: null
    },
    alertError: {
      active: false,
      message: ""
    }
  }),
  methods: {
    handleSubmit() {
      this.$refs.form.validate().then(success => {
        if (!success) return;
        this.login();
        this.alertError.active = false;
      });
    },
    login() {
      this.$store
        .dispatch("login", {
          email: this.models.email,
          password: this.models.password
        })
        .then(
          () => this.$router.push("/home"),
          err => {
            this.alertError.active = true;
            this.alertError.message = err;
          }
        );
    }
  }
};
</script>

<style></style>
