import {
  getCourses,
  deleteCourseService,
  createCourse,
  updateCourseService,
} from "../../services";

export const getCoursesThunk = () => {
  return async function (dispatch) {
    const courses = await getCourses();
    dispatch({ type: "courses/setCourses", payload: courses });
  };
};

export const createCourseThunk = (course) => {
  return async function (dispatch) {
    const response = await createCourse(course, localStorage.getItem("token"));
    dispatch({ type: "courses/saveCourse", payload: response });
  };
};

export const updateCourseThunk = (course) => {
  return async function (dispatch) {
    const response = await updateCourseService(
      course,
      localStorage.getItem("token")
    );
    dispatch({ type: "courses/updateCourse", payload: response });
  };
};

export const deleteCourseThunk = (courseId) => {
  return async function (dispatch) {
    await deleteCourseService(courseId, localStorage.getItem("token"));
    dispatch({ type: "courses/deleteCourse", payload: courseId });
  };
};
