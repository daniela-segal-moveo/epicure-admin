import { configureStore } from "@reduxjs/toolkit";
import ChefSlice from "./slices/ChefSlice";
import DishesSlice from "./slices/DishSlice";
import RestaurantSlice from "./slices/RestaurantSlice"; // Import RestaurantSlice
import UserSlice from "./slices/UserSlice";

export const store = configureStore({
  reducer: {
    chefs: ChefSlice,
    dishes: DishesSlice,
    restaurants: RestaurantSlice, 
    user: UserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
