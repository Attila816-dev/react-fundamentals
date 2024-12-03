import React from "react";
import { Button } from "../../../../common";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserRoleSelector } from "../../../../store/selectors";

export const EmptyCourseList = () => {
  let navigate = useNavigate();
  let userRole = useSelector(getUserRoleSelector);
  return (
    <div className="empty-course-list">
      <h1>Your List Is Empty</h1>
      {userRole?.toUpperCase() === "ADMIN" ? (
        <>
          <p>Please use "Add New Course" button to add your first course</p>
          <Button
            data-testid="addCourse"
            buttonText="ADD NEW COURSE"
            handleClick={() => {
              navigate("/courses/add");
            }}
          ></Button>
        </>
      ) : (
        <p>
          You don't have permissions to create a course. Please log in as ADMIN'
        </p>
      )}
    </div>
  );
};
