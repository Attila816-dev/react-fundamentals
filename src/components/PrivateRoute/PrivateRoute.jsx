// Module 1, 2, 3. You don't need to do anything with this component (we had to comment this component for tests)

// Module 4.
// * uncomment this component (ctrl + a => ctrl + /)
// * find example https://ebook.learn.epam.com/react-fundamentals/docs/module-4/private-routes
// * use 'PrivateRoute' to navigate to the routes:
//   ** '/courses/add';
//   ** '/courses/update/:courseId'.
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-4/home-task/components#private-route-new-component

import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserRoleSelector } from "../../store/selectors";

export const PrivateRoute = ({ children }) => {
  //wriet your code here
  const userRole = useSelector(getUserRoleSelector);
  return userRole === "admin" ? (
    children
  ) : localStorage.getItem("token") ? (
    <Navigate to="/courses" />
  ) : (
    <Navigate to="/login" />
  );
};
