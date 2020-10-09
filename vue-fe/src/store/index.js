import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth.module";
import note from "./modules/note.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, note }
});
