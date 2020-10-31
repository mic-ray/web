import AuthService from "@/services/auth.service";

const TOKEN_KEY = "token";
const USER_KEY = "username";

const auth = {
  state: {
    isAuthenticated: false,
    token: localStorage.getItem(TOKEN_KEY) || null,
    username: localStorage.getItem(USER_KEY) || null
  },

  getters: {
    isAuthenticated: state => state.isAuthenticated,
    getToken: state => state.token,
    getUsername: state => state.username
  },
  mutations: {
    setAuth: (state, status) => {
      state.isAuthenticated = status;
    },
    setToken: (state, token) => {
      localStorage.setItem(TOKEN_KEY, token);
      state.token = token;
    },
    setUsername: (state, username) => {
      localStorage.setItem(USER_KEY, username);
      state.username = username;
    },
    logout: state => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      state.token = null;
      state.username = null;
      state.isAuthenticated = false;
    }
  },

  actions: {
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        AuthService.login(credentials).then(
          response => {
            commit("setToken", response.data.user.token);
            commit("setUsername", response.data.user.username);
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
            commit("setToken", response.data.user.token);
            commit("setUsername", response.data.user.username);
            resolve();
          },
          err => {
            // If the request contains badly formatted data
            if (err.response.status === 400) {
              // Reject with the data errors
              reject(err.response.data.dataErrors);
            } else {
              // Else reject with error message about
              // data conflict or internal error
              reject(err.response.data.error.message);
            }
          }
        );
      });
    },
    checkAuth({ commit, state }) {
      return new Promise((resolve, reject) => {
        AuthService.checkAuth(state.token).then(
          () => {
            commit("setAuth", true);
            resolve();
          },
          () => {
            commit("logout");
            reject();
          }
        );
      });
    }
  }
};

export default auth;
