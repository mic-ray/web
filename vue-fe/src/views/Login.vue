<template>
  <v-tabs v-model="mode" centered>
    <v-tab href="#login">Login</v-tab>
    <v-tab href="#signup">Signup</v-tab>
    <v-tabs-items :value="mode">
      <v-tab-item value="login">
        <LoginForm />
      </v-tab-item>
      <v-tab-item value="signup">
        <SignupForm />
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
export default {
  components: {
    LoginForm,
    SignupForm
  },
  // Set the current route depending on the selected mode
  computed: {
    mode: {
      set(mode) {
        this.$router.replace({ query: { ...this.$route.query, mode } });
      },
      get() {
        return this.$route.query.mode;
      }
    }
  },
  data: () => ({})
};
</script>

<style scoped>
::v-deep .v-text-field {
  width: 300px;
}
</style>
