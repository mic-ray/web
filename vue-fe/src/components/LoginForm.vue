<template>
  <v-form @submit.prevent="login" v-model="valid">
    <v-row justify="center">
      <v-col cols="auto">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          outlined
          label="E-Mail"
          required
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          outlined
          type="password"
          label="Password"
          required
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn type="submit" :disabled="!valid">Login</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-banner v-if="authStatus">
        {{ authStatus }}
      </v-banner>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    email: null,
    emailRules: [
      v => !!v || "E-Mail is required!",
      v => (v && /^.+@[a-z]+\.[a-z]+/.test(v)) || "E-Mail isn't valid!"
    ],
    password: null,
    passwordRules: [
      v => !!v || "Password is required!",
      v => (v && v.length >= 8) || "Use atleast 8 characters!"
    ],
    valid: false
  }),
  computed: {
    authStatus() {
      return this.$store.getters.getAuthStatus;
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
