import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";


// Reusable Input component that supports basic text input and password visibility toggle
const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Toggles the visibility of the password input
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>

      <div className="input-box">
        
        <input
        // Determine the input type:
        // If it's a password field, show either "text" or "password" based on toggle
        // For all other types, use the given type directly
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          // Event handler to update parent state when input changes
          onChange={(e) => onChange(e)}
        />
         {/* If the input is a password field, show toggle icon */}
        {type === "password" && (
          <>
          {/* If password is visible, show eye icon */}
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            ) : (
              // If password is hidden, show eye-slash icon
              <FaRegEyeSlash
                size={22}
                className="text-slate-400 cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
