import axios from "../../services/index";
import { User } from "../models/user.model";

class UserAdapter {
  static readonly endpoint = {
    createUser: "/api/user/create",
    logIn: "/api/user/login",
  };

  static async createUser(userData: User) {
    const response = await axios.post(
      UserAdapter.endpoint.createUser,
      userData
    );
    return response.data;
  }

  static async LogIn(loginData: { email: string; password: string }) {
    const response = await axios.post(UserAdapter.endpoint.logIn, loginData);
    return response.data;
  }
}
export default UserAdapter;
