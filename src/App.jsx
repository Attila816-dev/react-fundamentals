import styles from "./App.module.css";
import {
  Header,
  Courses,
  CourseForm,
  CourseInfo,
  Login,
  Registration,
} from "./components";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { mockedAuthorsList, mockedCoursesList } from "./constants";
import { getCurrentDate } from "./helpers";

// Module 1:
// * use mockedAuthorsList and mockedCoursesList mocked data
// * add next components to the App component: Header, Courses and CourseInfo
// * pass 'mockedAuthorsList' and 'mockedCoursesList' to the Courses and CourseInfo components
// * use hook useState for saving selected courseId [showCourseId, handleShowCourse]

// Module 2:
// * use mockedAuthorsList and mockedCoursesList mocked data
// * remove useState for selected courseId
// * use hook useState for storing list of courses and authors
// * import Routes and Route from 'react-router-dom'
// * Add Routes to the container div (do not include Header to the Routes since header will not be changed with pages)
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-2/home-task/components#add-the-router-to-the-app-component

// Module 3:
// * the App component and BrowserRouter components should be wrapped with Redux 'Provider' in src/index.js
// * remove 'mockedAuthorsList' and 'mockedCoursesList' constants amd import and their use throughout the project
// * use selector from store/selectors.js to get user token from store
// * get courses and authors from the server. Use courses/all and authors/all GET requests.
// * save courses and authors to the store. Use 'setCourses' and 'setAuthors' actions from appropriate slices here 'src/store/slices'
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-3/home-task/components#app-component

// Module 4:
// * rewrite old GET requests /courses/all with 'getCoursesThunk' from 'src/store/thunks/coursesThunk.js' using getCourses service from 'src/services.js'.
// * rewrite old GET requests /authors/all with 'getAuthorsThunk' from 'src/store/thunks/authorsThunk.js' using getAuthors service from 'src/services.js'.
// * wrap 'CourseForm' in the 'PrivateRoute' component
// * get authorized user info by 'user/me' GET request if 'localStorage' contains token

function App() {
  let navigate = useNavigate();

  const handleUpdateCourse = (course) => {
    let existingCourse = mockedCoursesList.find((c) => c.id === course.Id);
    existingCourse.title = course.title;
    existingCourse.description = course.description;
    existingCourse.duration = course.duration;
    existingCourse.authors = course.authors;
    navigate("/courses");
  };

  const handleAddCourse = (course) => {
    mockedCoursesList.push({
      title: course.title,
      description: course.description,
      creationDate: getCurrentDate(),
      duration: course.duration,
      authors: course.authors,
    });
    navigate("/courses");
  };

  const handleCreateAuthor = (authorName) => {
    if (authorName.length < 2) {
      alert("Author name should be longer than 2 characters.");
      return false;
    } else if (mockedAuthorsList.find((author) => author.name === authorName)) {
      alert("This author is already in the list.");
    } else {
      mockedAuthorsList.push({
        name: authorName,
        id: mockedAuthorsList.length + 1,
      });
    }
  };

  // write your code here
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <Routes>
          <Route
            path="/"
            element={
              <Courses
                coursesList={mockedCoursesList}
                authorsList={mockedAuthorsList}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/courses/:courseId"
            element={
              <CourseInfo
                coursesList={mockedCoursesList}
                authorsList={mockedAuthorsList}
              />
            }
          />
          <Route
            path="/courses/add"
            element={
              <CourseForm
                authorsList={mockedAuthorsList}
                createCourse={handleAddCourse}
                createAuthor={handleCreateAuthor}
              />
            }
          />
          <Route
            path="/courses/update/:courseId"
            element={
              <CourseForm
                authorsList={mockedAuthorsList}
                createCourse={handleUpdateCourse}
                createAuthor={handleCreateAuthor}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
