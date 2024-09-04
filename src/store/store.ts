import { configureStore } from "@reduxjs/toolkit";
import ChefSlice from "./slices/ChefSlice";
import DishesSlice from "./slices/DishSlice";
import RestaurantSlice from "./slices/RestaurantSlice"; // Import RestaurantSlice

export const store = configureStore({
  reducer: {
    chefs: ChefSlice,
    dishes: DishesSlice,
    restaurants: RestaurantSlice, // Add RestaurantSlice to the store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
