import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUser, login } from "../thunks/UserThunk";
import { User } from "../models/user.model";

interface UserState {
  status: "idle" | "loading" | "succeeded" | "failed";
  user?: User; // Adjust type based on your user data structure
  token?: string; // Assuming token is stored here after login
  error?: string;
}

const initialState: UserState = {
  status: "idle",
  user: undefined,
  token: sessionStorage.getItem("token") || undefined,
  error: undefined,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogout(state) {
      state.user = undefined;
      state.token = undefined;
      state.status = "idle";
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload; // Adjust based on your payload structure
        state.status = "succeeded";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload.user; // Adjust based on your payload structure
        state.token = action.payload.token; // Assuming token is returned
        state.status = "succeeded";
        sessionStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const { setLogout } = UserSlice.actions;
export default UserSlice.reducer;
