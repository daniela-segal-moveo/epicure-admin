import { Restaurant } from "../models/restaurant.model";
import HttpClient from "../../services/HttpsClientService";
import axios from "../../services/index";

class RestaurantAdapter {
  static readonly endpoint = {
    getRestaurants: "/api/restaurants/",
    getRestaurantById: "/api/restaurants/get",
    updateRestaurant: "/api/restaurants/update",
    deleteRestaurant: "/api/restaurants/delete",
    addRestaurant: "/api/restaurants/add",
    getPopularRestaurants: "/api/restaurants/popular"
  };

  static async getAllRestaurant(): Promise<Restaurant[]> {
    const res = await HttpClient.getAll(
      RestaurantAdapter.endpoint.getRestaurants
    );
    return res;
  }

  static async getRestaurant(id: string): Promise<Restaurant> {
    const res = await HttpClient.get(
      RestaurantAdapter.endpoint.getRestaurantById,
      id
    );
    return res as Restaurant;
  }

  static async addRestaurant(newRestaurant: Restaurant): Promise<Restaurant> {
    const res = await HttpClient.add(
      `${RestaurantAdapter.endpoint.addRestaurant}`,
      newRestaurant
    );
    return res as Restaurant;
  }

  static async updateRestaurant(
    updatedRestaurant: Restaurant
  ): Promise<Restaurant> {
    const res = await HttpClient.update(
      RestaurantAdapter.endpoint.updateRestaurant,
      updatedRestaurant._id,
      updatedRestaurant
    );
    return res as Restaurant;
  }

  static async deleteRestaurant(id: string): Promise<Restaurant> {
    const res = await HttpClient.delete(RestaurantAdapter.endpoint.deleteRestaurant, id);
    return res as Restaurant;
  }

  static async getPopularRestaurants(): Promise<Restaurant[]> {
    const res = await axios.get(
      RestaurantAdapter.endpoint.getPopularRestaurants
    );
    return res.data;
  }
}

export default RestaurantAdapter;
