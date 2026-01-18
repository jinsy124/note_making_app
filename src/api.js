import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔑 Attach access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const tokens = localStorage.getItem("authTokens");

    if (tokens) {
      const { access } = JSON.parse(tokens);
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
