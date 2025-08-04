import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { PRIORITY_DATA } from "../../utils/data";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";
import SelectDropdown from "../../components/Inputs/SelectDropdown";
import SelectUsers from "../../components/Inputs/SelectUsers";
import TodoListInput from "../../components/Inputs/TodoListInput";
import DeleteAlert from "../../components/DeleteAlert";
import Modal from "../../components/Modal";
import { useSearchParams } from "react-router-dom";


const CreateTask = () => {
  // Get search params from the URL to check if editing an existing task
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get("taskId");
  const navigate = useNavigate();

  // Task form state
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    assignedTo: [],
    todoChecklist: [],
  });

  // Current task data when editing
  const [currentTask, setCurrentTask] = useState(null);

  // Error message and loading state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Modal toggle state for delete confirmation
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  // Handle form input changes
  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  };

  // Reset form to initial state
  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
    });
  };

  // Create a new task
  const createTask = async () => {
    setLoading(true);
    try {
      // Convert checklist strings to object format
      const todolist = taskData.todoChecklist?.map((item) => ({
        text: item,
        completed: false,
      }));

      // Make API request
      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      });

      toast.success("Task Created Successfully");
      clearData();
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing task
  const updateTask = async () => {
    setLoading(true);
    try {
      // Match existing checklist with new input to preserve completed state
      const todolist = taskData.todoChecklist?.map((item) => {
        const prevTodoChecklist = currentTask?.todoChecklist || [];
        const matchedTask = prevTodoChecklist.find((task) => task.text == item);

        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        };
      });

      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TASK(taskId),
        {
          ...taskData,
          dueDate: new Date(taskData.dueDate).toISOString(),
          todoChecklist: todolist,
        }
      );

      toast.success("Task Updated Successfully");
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for both create and update
  const handleSubmit = async () => {
    setError(null);

    // Basic form validation
    if (!taskData.title.trim()) return setError("Title is required.");
    if (!taskData.description.trim()) return setError("Description is required.");
    if (!taskData.dueDate) return setError("Due date is required.");
    if (taskData.assignedTo?.length === 0) return setError("Task not assigned to any member");
    if (taskData.todoChecklist?.length === 0) return setError("Add at least one todo task");

    if (taskId) return updateTask();
    createTask();
  };

  // Fetch task details when editing
  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );

      if (response.data) {
        const taskInfo = response.data;
        setCurrentTask(taskInfo);

        // Set form with task data
        setTaskData({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : null,
          assignedTo: taskInfo?.assignedTo?.map((item) => item?._id) || [],
          todoChecklist:
            taskInfo?.todoChecklist?.map((item) => item?.text) || [],
        });
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  // Delete task by ID
  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
      setOpenDeleteAlert(false);
      toast.success("Task details deleted successfully");
      navigate('/admin/tasks');
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Load task data on initial render if editing
  useEffect(() => {
    if (taskId) getTaskDetailsByID(taskId);
    return () => {};
  }, [taskId]);

  return (
    <DashboardLayout activeMenu="Create Task">
      {/* Form UI */}
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            {/* Title section */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-xl font-medium">
                {taskId ? "Update Task" : "Create Task"}
              </h2>
              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" /> Delete
                </button>
              )}
            </div>

            {/* Input fields */}
            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">Task Title</label>
              <input
                placeholder="Create App UI"
                className="form-input"
                value={taskData.title || ""}
                onChange={({ target }) => handleValueChange("title", target.value)}
              />
            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">Description</label>
              <textarea
                placeholder="Describe task"
                className="form-input"
                rows={4}
                value={taskData.description}
                onChange={({ target }) => handleValueChange("description", target.value)}
              />
            </div>

            {/* Priority, Due Date, Assign To */}
            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">Priority</label>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select Priority"
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">Due Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={taskData.dueDate}
                  onChange={({ target }) => handleValueChange("dueDate", target.value)}
                />
              </div>

              <div className="col-span-12 md:col-span-3">
                <label className="text-xs font-medium text-slate-600">Assign To</label>
                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) => handleValueChange("assignedTo", value)}
                />
              </div>
            </div>

            {/* Checklist Input */}
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">TODO Checklist</label>
              <TodoListInput
                todoList={taskData.todoChecklist}
                setTodoList={(value) => handleValueChange("todoChecklist", value)}
              />
            </div>

            {/* Error display */}
            {error && (
              <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
            )}

            {/* Submit button */}
            <div className="flex justify-end mt-7">
              <button className="add-btn" onClick={handleSubmit} disabled={loading}>
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Task"
      >
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          onDelete={() => deleteTask()}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default CreateTask;
