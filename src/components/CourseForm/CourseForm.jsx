// Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// Module 2.
// * uncomment this component (ctrl + a => ctrl + /)
// * add functionality to create new course with:
//   ** title
//   ** description
//   ** duration (user enters in minutes, you should map in format «hh:mm»)
//   ** existing authors (use 'authorsList' prop)
//   ** new created author (create field and button, update 'authorsList')
//   ** user should be able to remove author from the course
//   ** add validation to the fields
//   ** add new course to the 'coursesList' and navigate to the '/courses' page => new course should be in the courses list
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-2/home-task/components#add-new-course

// Module 3.
// * remove props - authorsList, createCourse, createAuthor
// * use selector from store/selectors.js to get authorsList from store
// * save new course to the store. Use action 'saveCourse' from 'src/store/slices/coursesSlice'
// * save new author to the store. Use action 'saveAuthor' from 'src/store/slices/authorsSlice'
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-3/home-task/components#add-new-course

// Module 4.
// * render this component only for ADMIN user
// * in this module you should separate functionality for this component:
//   ** create mode:
//     * form for the course creation should be opened by 'courses/add' route by 'ADD NEW COURSE' button click (as before)
//     * make a request to save new course
//     * use 'createCourse' service from 'src/services.js' and 'createCourseThunk' thunk from 'src/store/thinks/coursesThunk.js'
//     * use 'createAuthor ' service from 'src/services.js' and 'createAuthorThunk' thunk from 'src/store/thinks/authorsThunk.js'
//     * save new course to the store after success response
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-4/home-task/components#add-new-course
//   ** update mode:
//     * form should be opened by route '/courses/update/:courseId' route by 'update' button click
//     * appropriate forms field should be prefilled with course's info
//     * user should have ability to modify course information in the fields and change authors list
//     * make a request to save updated course
//     * use 'updateCourseService' from 'src/services.js' and 'updateCourseThunk' thunk from 'src/store/thinks/coursesThunk.js'
//     save updated course to the store after success response.
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-4/home-task/components#update-course

// Module 5:
// * proposed cases for unit tests:
//   ** CourseForm should show authors lists (all and course authors).
//   **  CourseForm 'Create author' button click should call dispatch.
//   **  CourseForm 'Add author' button click should add an author to the course authors list.
//   **  CourseForm 'Delete author' button click should delete an author from the course list.

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { getCoursesSelector, getAuthorsSelector } from "../../store/selectors";
import { Button, Input } from "../../common";
import { AuthorItem, CreateAuthor } from "./components";
import { getCourseDuration, getCurrentDate } from "../../helpers";
import styles from "./styles.module.css";
import { saveCourse, updateCourse } from "../../store/slices/coursesSlice";

export const CourseForm = () => {
  //write your code here
  let { courseId } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let coursesList = useSelector(getCoursesSelector);
  let authorsList = useSelector(getAuthorsSelector);
  const course = coursesList.find((course) => course.id === courseId);

  const [title, setTitle] = useState(course?.title ?? "");
  const [description, setDescription] = useState(course?.description ?? "");
  const [courseAuthors, setCourseAuthors] = useState(
    courseId ? [...course.authors] : []
  );

  const [duration, setDuration] = useState(course?.duration ?? 0);

  const handleTitleInput = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionInput = (event) => {
    setDescription(event.target.value);
  };

  const handleDurationInput = (event) => {
    setDuration(event.target.value);
  };

  const handleAddAuthor = (authorId) => {
    let newAuthorList = [...courseAuthors];

    if (newAuthorList.find((author) => author.id === authorId)) {
      alert("This author is already in the course author list.");
      return;
    }

    let newAuthor = authorsList.find((author) => author.id === authorId);
    newAuthorList.push(newAuthor);
    setCourseAuthors(newAuthorList);
  };

  const handleDeleteAuthor = (authorId) => {
    setCourseAuthors(courseAuthors.filter((author) => author.id !== authorId));
  };

  // title, description length should be at least 2 characters;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (courseAuthors.length === 0) {
      alert("All fields are required.");
      return false;
    }

    if (title.length < 2 || description.length < 2) {
      alert("Title and description should be at least 2 characters.");
      return false;
    }

    if (courseId) {
      dispatch(
        updateCourse({
          id: courseId,
          creationDate: course.creationDate,
          title: title,
          description,
          duration: Number(duration),
          authors: courseAuthors,
        })
      );
    } else {
      dispatch(
        saveCourse({
          id: uuidv4().toString(),
          creationDate: getCurrentDate(),
          title: title,
          description,
          duration: Number(duration),
          authors: courseAuthors,
        })
      );
    }

    navigate("/courses");
  };

  return (
    <div className={styles.container}>
      {courseId ? <h2>Update course</h2> : <h2>Create new course</h2>}

      <form className="container mt-3">
        <section className="row justify-content-between mt-3">
          <Input
            className="col-6"
            labelClassName="h6"
            labelText="Title"
            inputPlaceholder="Enter title..."
            type="text"
            id="title"
            required={true}
            onChange={handleTitleInput}
            data-testid="titleInput"
            inputValue={courseId && title}
          />
        </section>

        <section className="row mt-3">
          <label className="h6" htmlFor="courseDescription">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description..."
            minLength={2}
            required={true}
            onChange={handleDescriptionInput}
            value={courseId && description}
            className={styles.description}
            data-testid="descriptionTextArea"
          ></textarea>
        </section>

        <div className={styles.infoWrapper}>
          <div>
            <div className={styles.duration}>
              <Input
                labelText="Course duration"
                inputPlaceholder="Enter duration in minutes..."
                type="number"
                id="duration"
                required={true}
                min={1}
                onChange={handleDurationInput}
                inputValue={duration}
                data-testid="durationInput"
              />

              <p>
                Duration: <strong>{getCourseDuration(duration)}</strong> hours
              </p>
            </div>

            <h2>Authors</h2>
            {/* // use CreateAuthor component */}
            <CreateAuthor></CreateAuthor>

            <div className={styles.authorsContainer}>
              <h3>Authors List</h3>

              {/* // use 'map' to display all available autors. Reuse 'AuthorItem' component for each author */}
              {authorsList.map((author) => {
                return (
                  <AuthorItem
                    key={author.id}
                    author={author}
                    showAddButton={true}
                    handleAddAuthor={() => handleAddAuthor(author.id)}
                    showDeleteButton={false}
                  />
                );
              })}
            </div>
          </div>

          <div className={styles.courseAuthorsContainer}>
            <h2>Course authors</h2>

            {courseAuthors.length ? (
              courseAuthors.map((author) => {
                return (
                  <AuthorItem
                    key={author.id}
                    author={author}
                    handleDeleteAuthor={() => handleDeleteAuthor(author.id)}
                    showAddButton={false}
                    showDeleteButton={true}
                  />
                );
              })
            ) : (
              <p className={styles.notification}>List is empty</p>
            )}
          </div>
        </div>
      </form>

      <div className={styles.buttonsContainer}>
        {/* // reuse Button component for 'CREATE/UPDATE COURSE' button with
        // reuse Button component for 'CANCEL' button with */}
        <Button
          buttonText={courseId ? "Update Course" : "Create Course"}
          data-testid="createCourseButton"
          handleClick={handleSubmit}
        />
      </div>
    </div>
  );
};
