<template>
  <v-container>
    <v-form>
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <v-text-field outlined v-model="email" label="E-mail"></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <v-text-field
            outlined
            type="password"
            v-model="password"
            label="Password"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <v-btn>Login</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {};
</script>

<style></style>
