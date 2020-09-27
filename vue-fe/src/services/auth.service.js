import api from "@/utils/api";

class AuthService {
  setToken(token) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token") || null;
  }
  login(credentials) {
    return api.post("/auth/login", credentials);
  }
  signup(credentials) {
    return api.post("/auth/signup", credentials);
  }
}

export default new AuthService();
