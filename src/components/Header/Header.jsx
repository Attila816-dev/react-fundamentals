import { Button } from "../../common/Button";
import { Logo } from "./components/Logo";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData } from "../../store/slices/userSlice";
import { getUserNameSelector } from "../../store/selectors";

// Module 1:
// * add Logo and Button components
// * add Header component to the App component
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-1/home-task/components#header

// Module 2:
// * show user's name if he is logged in (use selector from store/selectors.js to get user token from store)
// * navigate to the /login route after 'LOGOUT' button click
// * hide 'LOGOUT' button and user's name for Login and Registration pages
// * remove token from localStorage by LOGOUT button click.
// ** PAY ATTATION ** token should be removed from localStorage immediately inside logout handler function
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-2/home-task/components#header

// Module 3:
// * use selector from store/selectors.js to get user's name from the store
// * remove user's data from the store. Use action 'removeUserData' from the 'src/store/slices/userSlice by LOGOUT button click
// * remove token from localStorage by LOGOUT button click.
// ** PAY ATTATION ** token should be removed from localStorage immediately inside logout handler function
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-3/home-task/components#header

// Module 4:
// make a request to lod out on 'LOGOUT' button click
// use thunk 'logoutThunk' from 'src/store/thunks/userThunk.js' and service 'logout' from 'src/services.js'
// ** PAY ATTATION ** token should be removed from localStorage immediately inside logout handler function

// Module 5:
// *proposed cases for unit tests:
//   ** Header should have logo and user's name.

export const Header = () => {
  // write your code here
  const location = useLocation();
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(true);
  let userName = useSelector(getUserNameSelector);

  const handleLogout = () => {
    if (localStorage.getItem("token")) {
      dispatch(removeUserData());
      localStorage.removeItem("token");
    }

    navigate("/login");
  };

  useEffect(() => {
    setShowLogout(
      location.pathname.indexOf("/registration") === -1 &&
        location.pathname.indexOf("/login") === -1
    ); // will be called once location was changed
  }, [location]);

  //LOGOUT button and user's name should not be on Login and Registration pages.

  return (
    <div className={styles.headerContainer}>
      <Logo />
      <div className={styles.userContainer}>
        {showLogout && (
          <>
            <p className={styles.userName}>{userName}</p>
            {localStorage.getItem("token") && (
              <Button
                buttonText="Logout"
                data-testid="logout"
                handleClick={handleLogout}
              ></Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
