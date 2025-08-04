import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import TaskCard from "../../components/Cards/TaskCard";

// ManageTasks component is responsible for displaying and filtering a list of all tasks assigned or created in the system.
const ManageTasks = () => {
  // State to store all tasks fetched from the backend
  const [allTasks, setAllTasks] = useState([]);

  // State to store the tab data showing task counts by status
  const [tabs, setTabs] = useState([]);

  // State to track the currently selected status filter
  const [filterStatus, setFilterStatus] = useState("All");

  // Used for navigating to other pages (e.g., edit task)
  const navigate = useNavigate();

  // Fetch all tasks from the backend, optionally filtered by status
  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus, // send blank if "All" to get all tasks
        },
      });

      // Update state with fetched tasks
      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);

      // Format and set the tab counts for each status
      const statusSummary = response.data?.statusSummary || {};
      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary.completedTasks || 0 },
      ];

      setTabs(statusArray);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // When a task card is clicked, navigate to the create-task page with the task ID in query params
  const handleClick = (task) => {
    navigate(`/admin/create-task?taskId=${task._id}`);
  };

  // Re-fetch tasks whenever the selected filter changes
  useEffect(() => {
    getAllTasks();
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <h2 className="text-xl md:text-xl font-medium">My Tasks</h2>
        </div>

        {/* Display tabs to switch between task statuses */}
        <TaskStatusTabs tabs={tabs} activeTab={filterStatus} setActiveTab={setFilterStatus} />

        {/* Display a grid of task cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allTasks.map((item) => (
            <TaskCard
              key={item._id}
              title={item.title}
              description={item.description}
              priority={item.priority}
              status={item.status}
              progress={item.progress}
              createdAt={item.createdAt}
              dueDate={item.dueDate}
              assignedTo={item.assignedTo?.map((u) => u.profileImageUrl)}
              attachmentCount={item.attachments?.length || 0}
              completedTodoCount={item.completedTodoCount || 0}
              todoChecklist={item.todoChecklist || []}
              onClick={() => handleClick(item)} // Navigate to edit screen on click
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageTasks;