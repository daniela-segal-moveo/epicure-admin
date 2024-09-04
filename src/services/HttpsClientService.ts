import axios from "./";

class HttpClient {
  static async getAll(resource: string) {
    const response = await axios.get(resource);
    return response.data;
  }

  static async get(resource: string, id: string) {
    const response = await axios.get(`${resource}/${id}`);
    return response.data;
  }

  static async add(resource: string, item: any) {
    const response = await axios.post(`${resource}`, item);
    return response.data;
  }
  static async update(resource: string, id: string, item: any) {
    const response = await axios.put(`${resource}/${id}`, item);
    return response.data;
  }

  static async delete(resource: string, id: string) {
    const response = await axios.delete(`${resource}/${id}`);
    return response.data;
  }
}

export default HttpClient;
