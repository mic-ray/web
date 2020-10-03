import AuthService from "@/services/auth.service";

const auth = {
  state: {
    authStatus: null,
    token: localStorage.getItem("token") || null
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
      localStorage.setItem("token", token);
      state.token = token;
    },
    logout: state => {
      localStorage.removeItem("token");
      state.token = null;
    }
  },

  actions: {
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        AuthService.login(credentials).then(
          response => {
            commit("setAuthStatus", response.data.result);
            commit("setToken", response.data.token);
            resolve();
          },
          err => {
            // If wrong data format or values were sent
            if (err.response.status === 400 || err.response.status === 401) {
              reject("Incorrect E-Mail or Password");
            } else {
              reject(err.response.data.error.message);
            }
          }
        );
      });
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
            // If the request contains badly formatted data
            if (err.response.status === 400) {
              // Reject with the data errors
              reject(err.response.data.dataErrors);
              // If the request is conflicting
            } else if (err.response.status === 409) {
              reject("E-Mail is already taken");
            } else {
              // Else reject with other error message
              reject(err.response.data.error.message);
            }
          }
        );
      });
    }
  }
};

export default auth;
