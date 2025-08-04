import React, { useEffect, useState } from "react";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { LuUsers } from "react-icons/lu";
import Modal from "../Modal";
import AvatarGroup from "../AvatarGroup";

// Component for selecting multiple users from a list via a modal
const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]); // Stores all users fetched from the API
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls visibility of the user selection modal
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]); // Stores temporary selections while modal is open

  // Fetches all users from the API when component mounts
  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data); // Store all users in local state
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Toggles selection for a user ID in tempSelectedUsers
  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId) // Remove if already selected
        : [...prev, userId] // Add if not selected
    );
  };

  // Finalizes the user selection and closes the modal
  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers); // Pass final selection to parent
    setIsModalOpen(false); // Close modal
  };

  // Maps selected user IDs to their profile image URLs for avatar display
  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl);

  // On component mount, fetch all users
  useEffect(() => {
    getAllUsers();
  }, []);

  // Reset temp selections when selectedUsers is cleared externally
  useEffect(() => {
    if (selectedUsers.length === 0) {
      setTempSelectedUsers([]);
    }

    return () => {};
  }, [selectedUsers]);

  return (
    <div className="space-y-4 mt-2">
      {/* If no users selected, show "Add Members" button */}
      {selectedUserAvatars.length === 0 && (
        <button className="card-btn" onClick={() => setIsModalOpen(true)}>
          <LuUsers className="text-sm" /> Add Members
        </button>
      )}

      {/* If users are selected, show avatar group */}
      {selectedUserAvatars.length > 0 && (
        <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
        </div>
      )}

      {/* Modal for user selection */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"
      >
        {/* Scrollable list of all users with checkboxes */}
        <div className="space-y-4 h-[60vh] overflow-y-auto">
          {allUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-4 p-3 border-b border-gray-200"
            >
              {/* User avatar */}
              <img
                src={user.profileImageUrl}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />

              {/* User name and email */}
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-white">
                  {user.name}
                </p>
                <p className="text-[13px] text-gray-500">{user.email}</p>
              </div>

              {/* Selection checkbox */}
              <input
                type="checkbox"
                checked={tempSelectedUsers.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none"
              />
            </div>
          ))}
        </div>

        {/* Modal footer with cancel and done buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button className="card-btn" onClick={() => setIsModalOpen(false)}>
            CANCEL
          </button>
          <button className="card-btn-fill" onClick={handleAssign}>
            DONE
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectUsers;
