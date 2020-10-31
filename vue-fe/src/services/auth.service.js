import api from "@/utils/api";

class AuthService {
  login(credentials) {
    return api.post("/auth/login", credentials);
  }
  signup(credentials) {
    return api.post("/auth/signup", credentials);
  }
  checkAuth(token) {
    console.log(token);
    return api.post(
      "/auth/check",
      // Empty data object required
      {},
      {
        headers: { Authorization: "Bearer " + token }
      }
    );
  }
}

export default new AuthService();
