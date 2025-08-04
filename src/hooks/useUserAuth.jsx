import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

// Custom hook to protect routes by checking user authentication
export const useUserAuth = () => {
  // Destructure user state and functions from UserContext
  const { user, loading, clearUser } = useContext(UserContext);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // useEffect will run whenever `user`, `loading`, `clearUser`, or `navigate` changes
  useEffect(() => {
    // If the app is still checking user status, do nothing
    if (loading) return;

    // If the user is logged in, do nothing (access allowed)
    if (user) return;

    // If no user and not loading, clear user state and redirect to login
    if (!user) {
      clearUser();          // Reset user state (optional safety)
      navigate("/login");   // Redirect unauthenticated user to login page
    }
  }, [user, loading, clearUser, navigate]);
};