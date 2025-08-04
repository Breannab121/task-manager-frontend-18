import React from 'react'

// DeleteAlert component shows a confirmation message with a delete button
const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
      {/* Display the alert content/message */}
      <p className="text-sm">{content}</p>

      {/* Delete button aligned to the right */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 text-xs md:text-sm font-medium text-rose-500 whitespace-nowrap bg-rose-50 border border-rose-100 rounded-lg px-4 py-2 cursor-pointer"
          onClick={onDelete} // Call the onDelete function when clicked
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default DeleteAlert