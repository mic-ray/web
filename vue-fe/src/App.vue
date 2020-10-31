<template>
  <v-app>
    <v-app-bar app>
      <router-link id="landing-link" tag="div" to="/">{{ title }}</router-link>
      <v-spacer />
      <v-btn
        v-for="entry in menuEntries"
        :key="entry.route"
        :to="entry.route"
        v-on="entry.function ? { click: entry.function } : {}"
        depressed
        class="mx-2"
      >
        <v-icon class="mr-2">{{ entry.icon }}</v-icon>
        {{ entry.title }}
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    title: "WebApp"
  }),
  computed: {
    isAuthenticated() {
      return !!this.$store.getters.getToken;
    },
    menuEntries() {
      return [
        {
          route: "/home",
          icon: "mdi-home",
          title: "Home",
          display: this.isAuthenticated
        },
        {
          route: "/login",
          icon: "mdi-account",
          title: "Login",
          display: !this.isAuthenticated
        },
        {
          route: "/",
          icon: "mdi-logout",
          title: "Logout",
          display: this.isAuthenticated,
          function: this.logout
        }
      ].filter(x => x.display);
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout");
    }
  },
  created: function() {
    // Dispatch store action to check auth
    this.$store.dispatch("checkAuth").then(
      // If successful, route to home directly
      () => this.$router.push("/home"),
      () => null
    );
  }
};
</script>

<style>
#landing-link {
  cursor: pointer;
}
</style>
