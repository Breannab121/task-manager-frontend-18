import axios from "axios";
import { BASE_URL } from "./apiPaths";

// Create an axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,               // Base URL for all API requests
  timeout: 10000,                  // Set request timeout to 10 seconds
  headers: {
    "Content-Type": "application/json", // Default content type for requests
    Accept: "application/json",         // Expect JSON responses
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage
    const accessToken = localStorage.getItem("token");

    // If token exists, add it to Authorization header
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Proceed with the modified request config
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is successful, just return it
    return response;
  },
  (error) => {
    // If the response has an error

    if (error.response) {
      // Handle unauthorized error globally
      if (error.response.status === 401) {
        window.location.href = "/login"; // Redirect to login page
      } 
      // Handle internal server error
      else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
    } 
    // Handle timeout or connection aborted error
    else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    }

    // Reject promise to allow handling error in individual requests
    return Promise.reject(error);
  }
);

// Export the customized axios instance for use throughout the app
export default axiosInstance;
