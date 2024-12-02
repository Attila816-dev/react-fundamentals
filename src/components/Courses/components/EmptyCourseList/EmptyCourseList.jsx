import React from "react";
import { Button } from "../../../../common";
import { useNavigate } from "react-router-dom";

export const EmptyCourseList = () => {
  let navigate = useNavigate();

  return (
    <div className="empty-course-list">
      <h1>Your List Is Empty</h1>
      <p>Please use "Add New Course" button to add your first course</p>
      <Button
        data-testid="addCourse"
        buttonText="ADD NEW COURSE"
        handleClick={() => {
          navigate("/courses/add");
        }}
      ></Button>
    </div>
  );
};
