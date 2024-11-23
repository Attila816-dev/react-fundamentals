import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CourseCard, EmptyCourseList, SearchBar } from "./components";
import styles from "./styles.module.css";

// Module 1:
// * render list of components using 'CourseCard' component for each course
// * render 'ADD NEW COURSE' button (reuse Button component)
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-1/home-task/components#courses-component
// * render EmptyCourseList component when no courses
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-1/home-task/components#emptycourselist-component
// * DO NOT map authors to the course inside Courses.jsx component (DO it inside CourseCard)

// Module 2:
// * render this component by route '/courses'
// * navigate to this component if 'localStorage' contains user's token
// * navigate to the route courses/add by clicking Add New Course button.
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-2/home-task/components#courses

// Module 3:
// * stop using mocked courses and authors data
// * delete props 'coursesList' and 'authorsList'
// * use useSelector to get courses and authors from the store
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-3/home-task/components#courses-component

// Module 4:
// navigate to '/courses/add' route by clicking 'ADD NEW COURSE' button in the 'EmptyCourseList'.
// show message 'You don't have permissions to create a course. Please log in as ADMIN' by clicking ADD NEW COURSE button in the 'EmptyCourseList'.
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-4/home-task/components#emptycourselist-component

// Module 5:
// * proposed cases for unit tests:
//   ** Courses should display amount of CourseCard equal length of courses array.
//   ** CourseForm should be shown after a click on the "Add new course" button.

export const Courses = ({ coursesList, authorsList }) => {
  // write your code here

  // for EmptyCourseList component container use data-testid="emptyContainer" attribute
  // for button in EmptyCourseList component add data-testid="addCourse" attribute
  let navigate = useNavigate();
  const [filteredCourses, setFilteredCourses] = useState(coursesList);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSearchSubmit = (input) => {
    if (input.length === 0) {
      setFilteredCourses(coursesList);
    } else {
      let filteredCourses = coursesList.filter(
        (course) =>
          course.title.toLowerCase().includes(input.toLowerCase()) ||
          course.id.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCourses(filteredCourses);
    }
  };

  return (
    <>
      <section className="row mt-3 justify-content-between">
        <SearchBar
          className="d-inline-flex col-md-6"
          onSubmit={handleSearchSubmit}
          inputPlaceholder="Enter course name or id..."
        />
      </section>
      <div className={styles.panel}>
        {!filteredCourses.length ? (
          <EmptyCourseList data-testid="emptyContainer" />
        ) : (
          <></>
        )}
      </div>
      {filteredCourses.map((course) => {
        return (
          <CourseCard
            key={course.id}
            course={course}
            authorsList={authorsList}
          />
        );
      })}
      {filteredCourses.length ? (
        <Link to="/courses/add" data-testid="addCourse">
          Add new course
        </Link>
      ) : (
        <></>
      )}
    </>
  );
};
