<template>
  <HelloWorld :name="user" />
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
