import AuthService from "@/services/auth.service";

const auth = {
  state: {
    authStatus: null
  },

  getters: {
    getAuthStatus: state => state.authStatus
  },
  mutations: {
    setAuthStatus: (state, data) => {
      state.authStatus = data;
    }
  },

  actions: {
    login(state, credentials) {
      AuthService.login(credentials)
        .then(response => {
          state.commit("setAuthStatus", response.message);
        })
        .catch(error => {
          console.log(error);
        });
    },
    signup(state, credentials) {
      AuthService.signup(credentials)
        .then(response => {
          state.commit("setAuthStatus", response.message);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};

export default auth;
