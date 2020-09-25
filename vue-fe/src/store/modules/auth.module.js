import AuthService from "@/services/auth.service";

const auth = {
  state: {
    authStatus: null,
    token: AuthService.getToken()
  },

  getters: {
    getAuthStatus: state => state.authStatus,
    getToken: state => state.token
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
      return new Promise((resolve, reject) => {
        AuthService.signup(credentials).then(
          response => {
            commit("setAuthStatus", response.data.result);
            commit("setToken", response.data.token);
            resolve();
          },
          err => {
            commit("setAuthStatus", err.response.data.error.message);
            reject();
          }
        );
      });
    }
  }
};

export default auth;
