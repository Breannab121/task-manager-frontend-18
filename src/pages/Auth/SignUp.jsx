import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import Input from "../../components/Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  // State variables for user input fields
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState(null);

  // Access updateUser from context and navigation hook
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle form submission for user sign-up
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    let profileImageUrl = "";

    // Basic validations
    if (!fullName) {
      setError("Please enter full name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(""); // Clear previous error

    try {
      // If user uploaded a profile image, upload it first
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      // Send user registration data to the server
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken,
      });

      const { token, role } = response.data;

      // If registration is successful, store token and update user context
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        // Navigate based on user role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      // Handle server error messages
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    // Authentication page layout
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        {/* Page header */}
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        {/* Sign-up form */}
        <form onSubmit={handleSignUp}>
          {/* Profile picture upload component */}
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          {/* Form input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 Characters"
              type="password"
            />
            <Input
              value={adminInviteToken}
              onChange={({ target }) => setAdminInviteToken(target.value)}
              label="Admin Invite Token"
              placeholder="6 Digit Code"
              type="text"
            />
          </div>

          {/* Show error message if any */}
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          {/* Submit button */}
          <button type="submit" className="btn-primary">
            SIGN UP
          </button>

          {/* Link to login page */}
          <p className="text-[13px] text-slate-800 mt-3">
            Already an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
