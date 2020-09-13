<template>
  <v-app>
    <v-app-bar app>
      <v-btn depressed to="/">{{title}}</v-btn>
      <v-spacer></v-spacer>
      <v-btn v-for="(entry,i) in menuEntries" :key="i" :to="entry.route" depressed class="mx-2">
        <v-icon class="mr-2">{{entry.icon}}</v-icon>
        {{entry.title}}
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    title: "WebApp",
    menuEntries: [
      {
        route: "/home",
        icon: "mdi-home",
        title: "Home"
      },
      {
        route: "/login",
        icon: "mdi-account",
        title: "Login"
      },

      {
        route: "/logout",
        icon: "mdi-logout",
        title: "Logout"
      }
    ]
  })
};
</script>

<style>
.landing-link {
  text-decoration: none;
  color: inherit;
}
</style>
