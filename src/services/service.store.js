import createApiClient from "./api.service";
class ServiceStore {
  constructor(baseUrl = "/api/store") {
    this.api = createApiClient(baseUrl);
  }
  async getAllApps() {
    return (await this.api.get("/")).data;
  }
  async getApp(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async getFilter(filter){
    return (await this.api.get(`/filter/${filter}`)).data;
  }
  // filter best
  async getFilterBest(filter){
    return (await this.api.get(`/best/${filter}`)).data;
  }
}
export default new ServiceStore();
