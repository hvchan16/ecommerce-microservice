import axios from "axios";

const PRODUCT_API_BASE_URL =
  process.env.REACT_APP_PRODUCT_API_BASE_URL || "http://localhost:3001/api";

const productApi = axios.create({
  baseURL: PRODUCT_API_BASE_URL,
});

// Add a request interceptor to include the token
productApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default productApi;
