<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <h1>Welcome to the WebApp!</h1>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn to="/login?mode=login" class="mx-2">
          Login
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn to="/login?mode=signup" class="mx-2">
          Signup
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style></style>
