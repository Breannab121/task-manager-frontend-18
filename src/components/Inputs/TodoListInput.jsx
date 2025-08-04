import React, { useState } from 'react'
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";

// Component to manage a dynamic list of todo items (input, add, delete)
const TodoListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState(""); // Local state for the current input value

  // Function to add a new todo item
  const handleAddOption = () => {
    if (option.trim()) { // Avoid adding empty or whitespace-only items
      setTodoList([...todoList, option.trim()]); // Add trimmed input to list
      setOption(""); // Reset input field
    }
  };

  // Function to delete a todo item by its index
  const handleDeleteOption = (index) => {
    const updatedArr = todoList.filter((_, idx) => idx !== index); // Remove item at that index
    setTodoList(updatedArr); // Update parent state
  };

  return (
    <div>
      {/* Loop through todoList and display each item with a delete button */}
      {todoList.map((item, index) => (
        <div
          key={item}
          className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2"
        >
          {/* Todo item with a numeric index label */}
          <p className="text-xs text-black">
            <span className="text-xs text-gray-400 font-semibold mr-2">
              {index < 9 ? `0${index + 1}` : index + 1} {/* Format 01, 02... */}
            </span>
            {item}
          </p>

          {/* Delete button */}
          <button
            className="cursor-pointer"
            onClick={() => handleDeleteOption(index)} // Remove selected item
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}

      {/* Input and add button section */}
      <div className="flex items-center gap-5 mt-4">
        {/* Text input for adding a new todo */}
        <input
          type="text"
          placeholder="Enter Task"
          value={option} // Controlled input value
          onChange={({ target }) => setOption(target.value)} // Update local input state
          className="w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md"
        />

        {/* Add button */}
        <button className="card-btn text-nowrap" onClick={handleAddOption}>
          <HiMiniPlus className="text-lg" /> Add
        </button>
      </div>
    </div>
  );
};

export default TodoListInput