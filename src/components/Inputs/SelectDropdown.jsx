import React, { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

// SelectDropdown is a custom dropdown component for selecting a value from a list of options
const SelectDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false); // Controls whether the dropdown menu is visible

  // When an option is clicked, update the selected value and close the dropdown
  const handleSelect = (option) => {
    onChange(option); // Pass selected value to parent via onChange
    setIsOpen(false); // Close dropdown
  };

  return (
    <div className="relative w-full">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown visibility
        className="w-full text-sm text-black outline-none bg-white border border-slate-100 px-2.5 py-3 rounded-md mt-2 flex justify-between items-center"
      >
        {/* Display the selected label or placeholder if no value is selected */}
        {value ? options.find((opt) => opt.value === value)?.label : placeholder}

        {/* Chevron icon rotates based on open state */}
        <span className="ml-2">
          {isOpen ? (
            <LuChevronDown className="rotate-180" /> // Icon rotates when open
          ) : (
            <LuChevronDown />
          )}
        </span>
      </button>

      {/* Dropdown Menu (shown only if isOpen is true) */}
      {isOpen && (
        <div className="absolute w-full bg-white border border-slate-100 rounded-md mt-1 shadow-md z-10">
          {options.map((option) => (
            // Each option in the dropdown menu
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)} // Select this option
              className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
