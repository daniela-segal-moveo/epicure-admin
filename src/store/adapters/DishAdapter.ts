import { Dish } from "../models/dish.model";
import HttpClient from "../../services/HttpsClientService";
import axios from "../../services/index";

class DishesAdapter {
  static readonly endpoint = {
    getDishes: "/api/dishes/",
    getDishById: "/api/dishes/get",
    updateDish: "/api/dishes/update",
    deleteDish: "/api/dishes/delete",
    addDish: "/api/dishes/add",
    getSignture: "/api/dishes/signature"
  };

  static async getAllDishes(): Promise<Dish[]> {
    const res = await HttpClient.getAll(DishesAdapter.endpoint.getDishes);
    return res as Dish[];
  }

  static async getDish(id: string): Promise<Dish> {
    const res = await HttpClient.get(DishesAdapter.endpoint.getDishById, id);
    return res.data as Dish;
  }

  static async addDish(newDish: Dish): Promise<Dish> {
    const res = await HttpClient.add(DishesAdapter.endpoint.addDish, newDish);
    return res.data as Dish;
  }

  static async updateDish(updatedDish: Dish): Promise<Dish> {
    const res = await HttpClient.update(
      DishesAdapter.endpoint.updateDish,
      updatedDish.id,
      updatedDish
    );
    return res.data as Dish;
  }

  static async deleteDish(id: string): Promise<Dish> {
    const res = await HttpClient.delete(DishesAdapter.endpoint.deleteDish, id);
    return res.data as Dish;
  }

  static async getSignatureDishes(): Promise<Dish[]> {
    const res = await axios.get(DishesAdapter.endpoint.getSignture);
    return res.data as Dish[];
  }
}

export default DishesAdapter;
