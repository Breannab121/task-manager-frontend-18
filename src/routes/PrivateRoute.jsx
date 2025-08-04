import React from 'react'
import { Outlet } from 'react-router-dom'

// Import necessary components (assumed in context, like React, Outlet from react-router-dom)
const PrivateRoute = ({ allowedRoles }) => {
  // This component currently just renders the child routes via Outlet
  // In its current form, it's not enforcing any role-based access control
  return <Outlet />;
};
export default PrivateRoute