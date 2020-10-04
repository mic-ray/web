<template>
  <h1>Hello {{ username }}!</h1>
</template>
<script>
export default {
  name: "Home",
  data: () => ({
    username: "User"
  }),
  // Retreive username from the store,
  // when component is created
  created() {
    this.username = this.$store.getters.getUsername;
  }
};
</script>
