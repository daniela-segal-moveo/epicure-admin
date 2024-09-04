import { Chef } from "./chef.model"; // Adjust the import path as needed
import { Dish } from "./dish.model"; // Adjust the import path as needed

export interface Restaurant {
  _id: string;
  name: string;
  imageUrl: string;
  chef?: Chef; // Updated to reflect that it's a full Chef object, not just an ID
  dishes: Dish[]; // Updated to reflect that it's an array of Dish objects, not just IDs
  isPopular: boolean; // Change from `true` to `boolean`
  stars: number;
  createdAt: Date;
}
