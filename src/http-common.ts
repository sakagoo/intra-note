import axios, { type AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  // APIのURI
  baseURL: "http://localhost:3699",
  // リクエストヘッダ
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;