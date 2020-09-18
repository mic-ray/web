<template>
  <div>
    <v-row><HelloWorld :name="user"/></v-row>
    <v-row justify="center"
      ><v-btn @click="getInfo">{{ info }}</v-btn></v-row
    >
  </div>
</template>
<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  methods: {
    // Set info data to the value from the store
    getInfo() {
      this.info = this.$store.getters.getInfo;
    }
  },
  data: () => ({
    user: "User",
    info: null
  }),
  // Call the store action when component is mounted
  mounted() {
    this.$store.dispatch("getInfo");
  }
};
</script>
