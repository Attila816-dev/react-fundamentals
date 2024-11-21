import React from "react";
import { Button } from "../../../../common";

export const EmptyCourseList = () => {
  return (
    <div className="empty-course-list">
      <h1>Your List Is Empty</h1>
      <p>Please use "Add New Course" button to add your first course</p>
      <Button data-testid="addCourse" buttonText="ADD NEW COURSE"></Button>
    </div>
  );
};
