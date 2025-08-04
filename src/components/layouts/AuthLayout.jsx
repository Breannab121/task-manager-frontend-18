import React from "react";

// Layout component used for authentication pages (e.g., login, signup)
const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Left side: form content area */}
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Task Manager</h2>
        {children} {/* Render the form content passed to this layout */}
      </div>

      {/* Right side: background image or branding (hidden on small screens) */}
      <div className="hidden md:flex w-[40vw] h-screen items-center justify-center bg-cover bg-no-repeat bg-center overflow-hidden p-8">
        {/* Empty for now – can add an image or illustration here */}
      </div>
    </div>
  );
};

export default AuthLayout;
