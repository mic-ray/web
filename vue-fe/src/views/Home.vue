<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <img alt="Vue logo" src="@/assets/logo.png" />
        <HelloWorld :name="user" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data: () => ({
    user: "User"
  })
};
</script>
