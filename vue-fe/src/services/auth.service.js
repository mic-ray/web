import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/auth";

class AuthService {
  setToken(token) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token") || null;
  }
  login(credentials) {
    return axios.post("/login", credentials);
  }
  signup(credentials) {
    return axios.post("/signup", credentials);
  }
}

export default new AuthService();
