import axios from "axios";

const PRODUCT_API_BASE_URL =
  process.env.REACT_APP_PRODUCT_API_BASE_URL || "http://localhost:3001/api";
const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN || "";

const productApi = axios.create({
  baseURL: PRODUCT_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

export default productApi;
