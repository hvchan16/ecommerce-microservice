import axios from "axios";

const ORDER_API_BASE_URL =
  process.env.REACT_APP_ORDER_API_BASE_URL || "http://localhost:3002/api";
const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN || "";

const orderApi = axios.create({
  baseURL: ORDER_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

export default orderApi;
