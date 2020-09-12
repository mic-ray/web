<template>
  <div id="text-center">
    <h1>Hello {{name}}!</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    name: {
      type: String,
      default: "Unknown"
    }
  },
  data: () => ({
    //
  })
};
</script>
