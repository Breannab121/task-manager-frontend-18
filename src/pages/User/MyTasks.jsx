import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import TaskCard from "../../components/Cards/TaskCard";

const MyTasks = () => {
  // State to store all fetched tasks
  const [allTasks, setAllTasks] = useState([]);

  // State to hold tab data for filtering tasks by status
  const [tabs, setTabs] = useState([]);

  // Currently selected filter status
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

  // Fetch all tasks from the server, optionally filtered by status
  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus, // empty string means no filter
        },
      });

      // Set task list from API response
      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);

      // Extract status summary from response and format it for tab display
      const statusSummary = response.data?.statusSummary || {};
      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary.completedTasks || 0 },
      ];

      // Set tabs for status filtering
      setTabs(statusArray);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Navigate to the task detail page when a task is clicked
  const handleClick = (taskId) => {
    navigate(`/user/task-details/${taskId}`);
  };

  // Fetch tasks whenever the selected filter changes
  useEffect(() => {
    getAllTasks(filterStatus);
    return () => {};
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          {/* Page Title */}
          <h2 className="text-xl md:text-xl font-medium">My Tasks</h2>

          {/* Status Filter Tabs */}
          {tabs?.[0]?.count > 0 && (
            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />
          )}
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allTasks?.map((item) => (
            <TaskCard
              key={item._id}
              title={item.title}
              description={item.description}
              priority={item.priority}
              status={item.status}
              progress={item.progress}
              createdAt={item.createdAt}
              dueDate={item.dueDate}
              assignedTo={item.assignedTo?.map((item) => item.profileImageUrl)}
              attachmentCount={item.attachments?.length || 0}
              completedTodoCount={item.completedTodoCount || 0}
              todoChecklist={item.todoChecklist || []}
              onClick={() => {
                handleClick(item._id); // Navigate to task details
              }}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
export default MyTasks;
