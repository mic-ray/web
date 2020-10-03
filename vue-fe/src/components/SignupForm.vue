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
              :vid="field.model"
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
            <v-btn type="submit">Signup</v-btn>
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
        model: "username",
        rules: ["required", "min:3"],
        type: "text",
        label: "Username"
      },
      {
        model: "password",
        rules: ["required", "min:8"],
        type: "password",
        label: "Password"
      },
      {
        model: "passwordConfirm",
        rules: ["required", "passwordMatch:@password"],
        type: "password",
        label: "Confirm Password"
      }
    ],
    models: {
      email: null,
      username: null,
      password: null,
      passwordConfirm: null
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
        this.signup();
        this.alertError.active = false;
      });
    },
    signup() {
      this.$store
        .dispatch("signup", {
          email: this.models.email,
          username: this.models.username,
          password: this.models.password
        })
        .then(
          () => this.$router.push("/home"),
          err => {
            if (typeof err === "object") this.$refs.form.setErrors(err);
            else {
              this.alertError.active = true;
              this.alertError.message = err;
            }
          }
        );
    }
  }
};
</script>

<style></style>
