import axios from "axios";
import { API_BASE_URL } from "./variable";
import { message } from "antd";

const messageget = axios.create({
  baseURL: API_BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});
messageget.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    message.error(error.response.data.message);
    return Promise.reject(error);
  }
);
export { messageget };
