import { Restaurant } from "./restaurant.model";
export interface Chef {
  _id: string;
  name: string;
  bio: string;
  imageUrl: string;
  restaurants: Restaurant[];
  isWeekChef: boolean;
  createdAt: string;
}
