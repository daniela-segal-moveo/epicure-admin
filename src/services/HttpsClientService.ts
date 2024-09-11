import {axiosInstance, axiosInstanceWithToken} from "./";

class HttpClient {
  static async getAll(resource: string) {
    const response = await axiosInstance.get(resource);
    return response.data;
  }

  static async get(resource: string, id: string) {
    const response = await axiosInstance.get(`${resource}/${id}`);
    return response.data;
  }

  static async add(resource: string, item: any) {
    const response = await axiosInstanceWithToken.post(`${resource}`, item);
    return response.data;
  }
  static async update(resource: string, id: string, item: any) {
    const response = await axiosInstanceWithToken.put(`${resource}/${id}`, item);
    return response.data;
  }

  static async delete(resource: string, id: string) {
    const response = await axiosInstanceWithToken.delete(`${resource}/${id}`);
    return response.data;
  }
}

export default HttpClient;
