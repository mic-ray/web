import AuthService from "@/services/auth.service";
import router from "@/router";

const auth = {
  state: {
    authStatus: null,
    token: AuthService.getToken()
  },

  getters: {
    getAuthStatus: state => state.authStatus
  },
  mutations: {
    setAuthStatus: (state, data) => {
      state.authStatus = data;
    },
    setToken: (state, token) => {
      AuthService.setToken(token);
      state.token = AuthService.getToken();
    }
  },

  actions: {
    login({ commit }, credentials) {
      AuthService.login(credentials).then(
        response => {
          commit("setAuthStatus", response.data.result);
          commit("setToken", response.data.token);
        },
        err => commit("setAuthStatus", err.response.data.error.message)
      );
    },
    signup({ commit }, credentials) {
      AuthService.signup(credentials).then(
        response => {
          commit("setAuthStatus", response.data.result);
          commit("setToken", response.data.token);
          router.push("/home");
        },
        err => commit("setAuthStatus", err.response.data.error.message)
      );
    }
  }
};

export default auth;
