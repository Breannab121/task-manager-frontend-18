import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import UserCard from "../../components/Cards/UserCard";

// Component to manage and display all users in the dashboard
const ManageUsers = () => {
  // State to store the list of all users
  const [allUsers, setAllUsers] = useState([]);

  // Function to fetch all users from the backend API
  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);

      // If users are returned, update state
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      // Log any errors that occur during the API call
      console.error("Error fetching users:", error);
    }
  };

  // useEffect runs once on component mount to fetch users
  useEffect(() => {
    getAllUsers();

    return () => {}; // Cleanup function (currently does nothing)
  }, []);

  return (
    // Wrapper layout with "Team Members" as the active tab/menu
    <DashboardLayout activeMenu="Team Members">
      <div className="mt-5 mb-10">
        {/* Page header */}
        <div className="flex md:flex-row md:items-center justify-between">
          <h2 className="text-xl md:text-xl font-medium">Team Members</h2>
        </div>

        {/* Grid layout to display each user in a card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allUsers?.map((user) => (
            // Render a UserCard component for each user
            <UserCard key={user._id} userInfo={user} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;
