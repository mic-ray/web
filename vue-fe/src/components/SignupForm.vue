<template>
  <div>
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
    <v-snackbar v-model="snackbar">
      {{ authStatus }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
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
        rules: ["required", "email", "emailAvailable"],
        type: "email",
        label: "E-Mail"
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
      password: null,
      passwordConfirm: null
    },
    snackbar: false
  }),
  computed: {
    authStatus() {
      return this.$store.getters.getAuthStatus;
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate().then(success => {
        if (!success) return;
        this.signup();
      });
    },
    signup() {
      this.$store
        .dispatch("signup", {
          email: this.models.email,
          password: this.models.password
        })
        .then(
          () => this.$router.push("/home"),
          err => {
            if (err) {
              this.$refs.form.setErrors(err);
            } else {
              this.snackbar = true;
            }
          }
        );
    }
  }
};
</script>

<style></style>
