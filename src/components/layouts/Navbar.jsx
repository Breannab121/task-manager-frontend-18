import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

// Navbar component with responsive sidebar toggle
const Navbar = ({ activeMenu }) => {
  // State to toggle visibility of the sidebar on small screens
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex gap-5 bg-white border boredr-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      {/* Toggle button shown only on small screens (lg:hidden) */}
      <button
        className="block lg:hidden text-black"
        onClick={() => {
          setOpenSideMenu(!openSideMenu); // Toggle sidebar visibility
        }}
      >
        {/* Show close (X) or hamburger (menu) icon based on sidebar state */}
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      {/* App title */}
      <h2 className="text-lg font-medium text-black">Task Manager</h2>

      {/* Sidebar menu appears below navbar when toggled open */}
      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
