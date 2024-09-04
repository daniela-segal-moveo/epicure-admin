import { Restaurant } from "./restaurant.model";
export interface Dish {
  _id: string;
  name: string;
  ingredients: string[];
  description: string;
  imageUrl: string;
  price: number;
  isSignature: boolean;
  category: string[];
  restaurantId: Restaurant;
  createdAt: Date;
}
