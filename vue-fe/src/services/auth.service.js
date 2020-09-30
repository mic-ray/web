import api from "@/utils/api";

class AuthService {
  login(credentials) {
    return api.post("/auth/login", credentials);
  }
  signup(credentials) {
    return api.post("/auth/signup", credentials);
  }
}

export default new AuthService();
