import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import vuetify from "@/plugins/vuetify";
import store from "@/store";
import "@/plugins/validators";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

Vue.use(VueToast);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
