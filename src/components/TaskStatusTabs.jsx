import React from "react";

// TaskStatusTabs component: Renders a horizontal tab UI to filter tasks by status
const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="my-2">
      <div className="flex">
        {/* Iterate through each tab and render a button */}
        {tabs.map((tab) => (
          <button
            key={tab.label} // Unique key for each tab
            className={`relative px-3 md:px-4 py-2 text-sm font-medium ${
              activeTab === tab.label
                ? "text-primary" // Highlight active tab
                : "text-gray-500 hover:text-gray-700" // Default style for inactive tabs
            } cursor-pointer`}
            onClick={() => setActiveTab(tab.label)} // Update active tab on click
          >
            <div className="flex items-center">
              {/* Tab label */}
              <span className="text-xs">{tab.label}</span>

              {/* Tab count badge */}
              <span
                className={`text-xs ml-2 px-2 py-0.5 rounded-full ${
                  activeTab === tab.label
                    ? "bg-primary text-white" // Highlight active tab count
                    : "bg-gray-200/70 text-gray-600" // Default badge style
                }`}
              >
                {tab.count}
              </span>
            </div>

            {/* Underline indicator for active tab */}
            {activeTab === tab.label && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusTabs;
