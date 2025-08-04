import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

// Dashboard layout wrapper that includes the Navbar and SideMenu
const DashboardLayout = ({ children, activeMenu }) => {
  // Get the current logged-in user from context
  const { user } = useContext(UserContext);

  return (
    <div className="">
      {/* Top navigation bar with active menu indicator */}
      <Navbar activeMenu={activeMenu} />

      {/* Render layout only if user is logged in */}
      {user && (
        <div className="flex">
          {/* Sidebar is hidden on screens smaller than 1080px */}
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Main content area */}
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};
export default DashboardLayout;
