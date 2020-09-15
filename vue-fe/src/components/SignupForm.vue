<template>
  <v-form v-model="valid">
    <v-row justify="center">
      <v-col cols="auto">
        <v-text-field
          v-model="email"
          :rules="[v => !!v || 'E-Mail is required!']"
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
          :rules="[v => !!v || 'Password is required!']"
          outlined
          type="password"
          label="Password"
          required
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <v-text-field
          v-model="passwordConfirm"
          :rules="[v => !!v || 'Confirm your password!']"
          outlined
          type="password"
          label="Repeat Password"
          required
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn :disabled="!valid">Signup</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    email: null,
    password: null,
    passwordConfirm: null,
    valid: false
  })
};
</script>

<style></style>
