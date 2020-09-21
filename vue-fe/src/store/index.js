import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
axios.defaults.baseURL = "http://localhost:3000/";

export default new Vuex.Store({
  state: {
    info: "",
    authStatus: null
  },
  mutations: {
    setInfo: (state, data) => {
      state.info = data;
    },
    setAuthStatus: (state, data) => {
      state.authStatus = data;
    }
  },
  getters: {
    getInfo: state => state.info,
    getAuthStatus: state => state.authStatus
  },
  actions: {
    login(state, credentials) {
      axios
        .post("/auth/login", credentials)
        .then(response => {
          state.commit("setAuthStatus", response.data.message);
        })
        .catch(error => {
          console.log(error);
        });
    },
    signup(state, credentials) {
      axios
        .post("/auth/signup", credentials)
        .then(response => {
          state.commit("setAuthStatus", response.data.message);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getInfo(state) {
      axios
        .get("/info")
        .then(response => {
          state.commit("setInfo", response.data.info);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  modules: {}
});
