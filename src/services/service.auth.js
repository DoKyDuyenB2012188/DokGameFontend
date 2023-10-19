import createApiClient from "./api.service";
import axios from "axios";
class ServiceAuth {
  constructor(baseUrl = "/api/auth") {
    this.api = createApiClient(baseUrl);
  }
  async register(data) {
    return (await this.api.post("/register", data)).data;
  }
  async login(data) {
    return (await this.api.post("/login", data)).data;
  }
  async logout() {
    return (await this.api.post("/logout")).data;
  }
  async refresh_token() {
    return (await this.api.post("/refresh_token")).data;
  }
  async auth_protected(accessToken) {
    const headers = {
      authorization: `Bearer ${accessToken}`,
    };
    return (await this.api.post("/auth/protected", {}, { headers })).data;
  }
}
export default new ServiceAuth();
