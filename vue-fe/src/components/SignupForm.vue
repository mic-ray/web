<template>
  <ValidationObserver ref="form">
    <v-form @submit.prevent="handleSubmit">
      <v-row justify="center" v-for="(field, i) in formFields" :key="i">
        <v-col cols="auto">
          <ValidationProvider
            :name="field.label"
            :rules="field.rules.join('|')"
            v-slot="{ errors, valid, touched, pristine, failed }"
          >
            <v-text-field
              v-model="field.model"
              :type="field.type"
              :label="field.label"
              :error-messages="touched || (pristine && failed) ? errors : null"
              :success="!pristine && valid"
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
    passwordConfirm: null
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
          rules: ["required", "passwordMatch:@Password"],
          type: "password",
          label: "Confirm Password"
        }
      ];
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate().then(success => {
        if (!success) return;
      });
    }
  }
};
</script>

<style></style>
