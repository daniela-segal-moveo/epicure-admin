import { createAsyncThunk } from "@reduxjs/toolkit";
import UserAdapter from "../adapters/UserAdapter";
import { User } from "../models/user.model";

export const createUser = createAsyncThunk(
  "/createUser",
  async (userDate: User) => {
    try {
      const response = await UserAdapter.createUser(userDate);
      return response;
    } catch (error: any) {
      throw new Error("error fetching data");
    }
  }
);

export const login = createAsyncThunk(
  "/LogIn",
  async (loginData: { email: string; password: string }) => {
    try {
      const response = await UserAdapter.LogIn(loginData);
      return response;
    } catch (error: any) {
      throw new Error("error fetching data");
    }
  }
);
