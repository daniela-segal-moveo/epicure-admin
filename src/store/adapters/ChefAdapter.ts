import { Chef } from "../models/chef.model";
import HttpClient from "../../services/HttpsClientService";
import axios from "../../services/index";

class ChefsAdapter {
  static readonly endpoint = {
    getChefs: "/api/chefs/",
    getChefById: "/api/chefs/get",
    updateChef: "/api/chefs/update",
    deleteChef: "/api/chefs/delete",
    addChef: "/api/chefs/add",
    getWeekChef: "api/chefs/weekChef",
  };

  static async getAllChefs(): Promise<Chef[]> {
    const res = await HttpClient.getAll(ChefsAdapter.endpoint.getChefs);
    return res as Chef[];
  }

  static async getChef(id: string): Promise<Chef> {
    const res = await HttpClient.get(ChefsAdapter.endpoint.getChefById, id);
    return res as Chef;
  }

  static async addChef(newChef: Chef): Promise<Chef> {
    const res = await HttpClient.add(ChefsAdapter.endpoint.addChef, newChef);
    return res as Chef;
  }

  static async updateChef(updatedChef: Chef): Promise<Chef> {
    const res = await HttpClient.update(
      ChefsAdapter.endpoint.updateChef,
      updatedChef._id,
      updatedChef
    );
    return res as Chef;
  }

  static async deleteChef(id: string): Promise<Chef> {
    const res = await HttpClient.delete(ChefsAdapter.endpoint.deleteChef, id);
    return res as Chef;
  }

  static async getWeekChef(): Promise<Chef> {
    const res = await axios.get(ChefsAdapter.endpoint.getWeekChef);
    return res.data as Chef;
  }

  static async updateChefOfTheWeek(id: string): Promise<string> {
    const res = await axios.post(`${ChefsAdapter.endpoint.getWeekChef}/${id}`);
    return res.data as string;
  }
}

export default ChefsAdapter;
