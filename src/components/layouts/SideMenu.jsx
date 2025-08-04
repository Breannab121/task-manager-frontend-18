import React, { useContext, useEffect, useState } from "react";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

// SideMenu component to render navigation links for admin or user roles
const SideMenu = ({ activeMenu }) => {
  // Access user data and logout function from UserContext
  const { user, clearUser } = useContext(UserContext);

  // State to hold menu data based on user role
  const [sideMenuData, setSideMenuData] = useState([]);

  const navigate = useNavigate();

  // Handles navigation or logout
  const handleClick = (route) => {
    if (route === "logout") {
      handelLogout(); // Call logout handler
      return;
    }

    navigate(route); // Navigate to the specified route
  };

  // Clears session and redirects to login page
  const handelLogout = () => {
    localStorage.clear(); // Clear local storage
    clearUser(); // Clear user context
    navigate("/login"); // Redirect to login
  };

  // Set menu data based on whether the user is admin or regular user
  useEffect(() => {
    if (user) {
      setSideMenuData(user?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
    }
    return () => {};
  }, [user]);

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20">
      {/* User profile section */}
      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        <div className="relative">
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile Image"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        </div>

        {/* Show 'Admin' tag if user is an admin */}
        {user?.role === "admin" && (
          <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1">
            Admin
          </div>
        )}

        {/* Display user name and email */}
        <h5 className="text-gray-950 font-medium leading-6 mt-3">
          {user?.name || ""}
        </h5>
        <p className="text-[12px] text-gray-500">{user?.email || ""}</p>
      </div>

      {/* Render menu items */}
      {sideMenuData.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu == item.label
              ? "text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3"
              : ""
          } py-3 px-6 mb-3 cursor-pointer`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
