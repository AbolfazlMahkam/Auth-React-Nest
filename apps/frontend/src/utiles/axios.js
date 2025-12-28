import axios from "axios";
import localStorageService from "./localStorageService";

const HttpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  timeout: 0,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate", // Disable caching
    Pragma: "no-cache", // Disable caching for HTTP/1.0
    Expires: "0", // Disable caching for proxies
  },
});

HttpClient.interceptors.request.use(
  (config) => {
    config.headers["authorization"] =
      `Bearer ${localStorageService.getToken()}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

HttpClient.interceptors.response.use(
  (response) => response.data || null,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      window.location.href = "#/internet";
    }

    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          break;
        case 401:
          localStorageService.removeToken();
          window.location.reload();
          break;
        case 403:
          break;
        case 404:
          break;
        case 405:
          break;
        case 408:
          break;
        case 411:
          break;
        case 413:
          break;
        case 414:
          break;
        case 415:
          break;
        case 422:
          break;
        case 500:
          break;
        case 501:
          break;
        case 502:
          break;
        case 503:
          break;
        case 504:
          break;
        case 505:
          break;
        default:
          console.log(`http client status : ${error.response.status}`);
      }
    }

    return Promise.reject(error);
  },
);

export default HttpClient;
