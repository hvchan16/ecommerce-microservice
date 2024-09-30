import axios from "axios";

const ORDER_API_BASE_URL =
  process.env.REACT_APP_ORDER_API_BASE_URL || "http://localhost:3002/api";

const orderApi = axios.create({
  baseURL: ORDER_API_BASE_URL,
});

// Add a request interceptor to include the token
orderApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default orderApi;
