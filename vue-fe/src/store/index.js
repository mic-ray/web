import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
axios.defaults.baseURL = "http://localhost:5000/";

export default new Vuex.Store({
  state: {
    info: "Default info!"
  },
  mutations: {
    setInfo: (state, data) => {
      state.info = data;
    }
  },
  getters: {
    getInfo: state => state.info
  },
  actions: {
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
