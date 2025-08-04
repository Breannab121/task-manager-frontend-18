import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import { addThousandsSeparator } from "../../utils/helper";
import InfoCard from "../../components/Cards/InfoCard";
import TaskListTable from "../../components/TaskListTable";

// Hardcoded colors array (currently unused in this file, might be used in chart components)
const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];

const Dashboard = () => {
  // Redirects to /login if not authenticated
  useUserAuth();

  // Access logged-in user info from context
  const { user } = useContext(UserContext);

  // Used to navigate programmatically between routes
  const navigate = useNavigate();

  // Local state to store dashboard data fetched from the backend
  const [dashboardData, setDashboardData] = useState(null);

  // Fetch dashboard stats from API (task counts, charts, recent tasks)
  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );
      if (response.data) {
        setDashboardData(response.data); // Save API response to local state
      }
    } catch (error) {
      console.error("Error fetching users:", error); // Log error if request fails
    }
  };

  // Handle 'See More' click — navigates to admin task list page
  const onSeeMore = () => {
    navigate('/admin/tasks');
  };

  // Call getDashboardData when component mounts
  useEffect(() => {
    getDashboardData();

    return () => {}; // Cleanup (currently unused)
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      {/* Greeting and current date */}
      <div className="card my-5">
        <div>
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl">Good Morning! {user?.name}</h2>
            <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
              {moment().format("dddd Do MMM YYYY")} {/* e.g., Monday 4th Aug 2025 */}
            </p>
          </div>
        </div>

        {/* Stat cards for task counts */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          <InfoCard
            label="Total Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0
            )}
            color="bg-primary"
          />

          <InfoCard
            label="Pending Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Pending || 0
            )}
            color="bg-violet-500"
          />

          <InfoCard
            label="In Progress Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.InProgress || 0
            )}
            color="bg-cyan-500"
          />

          <InfoCard
            label="Completed Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Completed || 0
            )}
            color="bg-lime-500"
          />
        </div>
      </div>

      {/* Task distribution table (recent tasks) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
        <div>
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className="font-medium">Task Distribution</h5>
              {/* Optional: add "See more" button here to use onSeeMore */}
            </div>

            {/* Table showing recently created tasks */}
            <TaskListTable tableData={dashboardData?.recentTasks || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
