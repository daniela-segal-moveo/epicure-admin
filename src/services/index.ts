import axios from "axios";
import { store } from "../store/store";
import { setLogout } from "../store/slices/UserSlice";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const axiosInstanceWithToken = axios.create({
  baseURL: "http://localhost:3000",
});

axiosInstanceWithToken.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token"); // Or get it from a Redux selector if needed
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceWithToken.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // store.dispatch(setLogout());
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export { axiosInstance, axiosInstanceWithToken };
