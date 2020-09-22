import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/auth";

class AuthService {
  login(credentials) {
    return axios.post("/login", credentials).then(res => res.data);
  }
  signup(credentials) {
    return axios.post("/signup", credentials).then(res => res.data);
  }
}

export default new AuthService();
