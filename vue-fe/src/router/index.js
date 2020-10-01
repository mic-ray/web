import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Landing from "@/views/Landing.vue";
import Login from "@/views/Login.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      // If not authenticated
      if (!store.getters.getToken) {
        // Redirect to login
        next("/login");
        return;
      }
      next();
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      // If already authenticated
      if (store.getters.getToken) {
        // redirect to home
        next("/home");
        return;
      }
      next();
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});
export default router;
