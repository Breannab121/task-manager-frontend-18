import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

// Component to allow users to select, preview, and remove a profile photo
const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null); // Ref to access the hidden file input element
  const [previewUrl, setPreviewUrl] = useState(null); // Local state for showing the image preview

  // Called when the user selects a new file
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setImage(file); // Update the parent component's image state
      const preview = URL.createObjectURL(file); // Create a temporary preview URL
      setPreviewUrl(preview); // Store preview URL locally for display
    }
  };

  // Removes the current selected image and preview
  const handleRemoveImage = () => {
    setImage(null); // Clear image state in parent
    setPreviewUrl(null); // Clear preview URL in local state
  };

  // Programmatically triggers the hidden file input click
  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      {/* Hidden file input field that accepts only images */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* If no image is selected, show a placeholder avatar with an upload button */}
      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-blue-100/50 rounded-full relative cursor-pointer">
          {/* Default user icon */}
          <LuUser className="text-4xl text-primary" />

          {/* Floating upload button in bottom-right */}
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
            onClick={onChooseFile} // Opens file selector
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        // If an image is selected, show the preview and a delete button
        <div className="relative">
          {/* Display the selected image using the preview URL */}
          <img
            src={previewUrl}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover"
          />

          {/* Floating delete button to remove the image */}
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
