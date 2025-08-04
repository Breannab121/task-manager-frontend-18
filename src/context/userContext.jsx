import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

// Create a new context to manage user authentication state
export const UserContext = createContext();

// Provider component that wraps around the app to share auth state
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);         // Stores the authenticated user object
  const [loading, setLoading] = useState(true);   // Tracks if the app is still checking auth state

  // On component mount, check if there's a token in localStorage
  useEffect(() => {
    if (user) return; // If already logged in, skip

    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(false); // No token = no user = done loading
      return;
    }

    // Fetch user profile using the token (to validate and get user info)
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data); // Save user data into context
      } catch (error) {
        console.error("User not authenticated", error);
        clearUser(); // If token is invalid or expired, clear user
      } finally {
        setLoading(false); // Finish loading regardless of result
      }
    };

    fetchUser(); // Trigger profile fetch
  }, []);

  // Set user and store token in localStorage (e.g., after login)
  const updateUser = (userData) => {
    setUser(userData); // Set user info in context
    localStorage.setItem("token", userData.token); // Save token locally
    setLoading(false); // Mark as done loading
  };

  // Clear user and token from context and storage (e.g., on logout)
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // Share state and methods with all children wrapped in this provider
  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};


export default UserProvider