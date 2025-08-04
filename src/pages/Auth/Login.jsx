import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = () => {
  // States for email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Access updateUser function from UserContext
  const { updateUser } = useContext(UserContext);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle form submission and login logic
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Validate email
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(""); // Clear previous error

    try {
      // Send login request to backend
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;

      // If login is successful, store token and update user context
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        // Navigate to dashboard based on user role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      // Set error message from server or fallback
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    // Layout wrapper for authentication pages
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        {/* Page heading */}
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>

        {/* Login form */}
        <form onSubmit={handleLogin}>
          {/* Email input */}
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          {/* Password input */}
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {/* Show error message if any */}
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          {/* Submit button */}
          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          {/* Link to SignUp page */}
          <p className="text-[13px] text-slate-800 mt-3">
            Don’t have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
