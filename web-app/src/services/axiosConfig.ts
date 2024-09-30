import axios from "axios";

const setupAxiosInterceptors = (token: string | null) => {
  axios.interceptors.request.use(
    (config) => {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        delete axios.defaults.headers.common["Authorization"];
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default setupAxiosInterceptors;
