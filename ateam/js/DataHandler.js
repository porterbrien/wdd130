async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export class DataHandler {
  constructor() {
    this.categories = [];
    this.activities = [];
  }
  async makeRequest(file) {
    return fetch(`../data/${file}.json`).then(convertToJson);
  }

  async getCategories() {
    const response = await this.makeRequest("categories");
    this.categories = response;
    return response;
  }

  async getActivities() {
    const response = await this.makeRequest("activities");
    this.activities = this.activities;
  }

  filter(data, tag) {}

  init() {
    this.getCategories();
    this.getActivities();
  }
}
