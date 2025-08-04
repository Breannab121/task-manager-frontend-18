import React from 'react'

// AvatarGroup component displays a group of avatar images with optional overflow indicator
const AvatarGroup = ({ avatars, maxVisible = 3 }) => {
  return (
    <div className="flex items-center">
      {/* Display only up to maxVisible avatars */}
      {avatars.slice(0, maxVisible).map((avatar, index) => (
        <img
          key={index}
          src={avatar} // Avatar image URL
          alt={`Avatar ${index}`} // Alt text for accessibility
          className="w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0" // Styling for overlap effect
        />
      ))}

      {/* If there are more avatars than maxVisible, show a +X indicator */}
      {avatars.length > maxVisible && (
        <div className="w-9 h-9 flex items-center justify-center bg-blue-50 text-sm font-medium rounded-full border-2 border-white -ml-3">
          +{avatars.length - maxVisible}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup