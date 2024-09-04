import { createSlice } from "@reduxjs/toolkit";
import { Chef } from "../models/chef.model";
import {
  getAllChefs,
  getChef,
  addChef,
  updateChef,
  deleteChef,
  getWeekChef,
} from "../thunks/ChefThunk";

interface ChefState {
  chefs: Chef[];
  selectedChef: string | null;
  weekChef: Chef | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ChefState = {
  chefs: [],
  selectedChef: null,
  weekChef: null,
  status: "idle",
  error: null,
};

const chefSlice = createSlice({
  name: "chefs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllChefs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllChefs.fulfilled, (state, action: any) => {
        state.chefs = action.payload;
        state.status = "succeeded";
      })
      .addCase(getAllChefs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })
      .addCase(getChef.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getChef.fulfilled, (state, action: any) => {
        state.selectedChef = action.payload.id;
        state.status = "succeeded";
      })
      .addCase(getChef.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })
      .addCase(addChef.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addChef.fulfilled, (state, action: any) => {
        const newChef = action.payload as Chef;
        // Ensure newChef has the correct structure
        if (newChef && newChef._id) {
          // Replace the entire array with the updated list
          state.chefs = [...state.chefs, newChef];
          state.status = 'succeeded';
        } else {
          console.error('Invalid chef data:', newChef);
          state.status = 'failed';
        }
      })
      .addCase(addChef.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })
      .addCase(updateChef.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateChef.fulfilled, (state, action: any) => {
        const index = state.chefs.findIndex(
          (chef) => chef._id === action.payload._id
        );
        if (index !== -1) {
          state.chefs[index] = action.payload;
        }
        state.status = "succeeded";
      })
      .addCase(updateChef.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })
      .addCase(deleteChef.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteChef.fulfilled, (state, action: any) => {
        const index = state.chefs.findIndex(
          (chef) => chef._id === action.payload._id
        );
        if (index !== -1) {
          state.chefs.splice(index, 1);
        }
        state.status = "succeeded";
      })
      .addCase(deleteChef.rejected, (state) => {
        state.status = "failed";
      }).addCase(getWeekChef.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWeekChef.fulfilled, (state, action: any) => {
        state.weekChef = action.payload;
        state.status = "succeeded";
      })
      .addCase(getWeekChef.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })
  },
});

export default chefSlice.reducer;
