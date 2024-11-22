// // Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// Module 2.
// * uncomment this component (ctrl + a => ctrl + /)
// * finish markup according to the figma https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2927-216&mode=design&t=0FIG0iRzKcD0s16M-0
// * add validation for fields: all fields are required. Show validation message. https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-191&mode=design&t=0FIG0iRzKcD0s16M-0
// * render this component by route '/login'
// * use login service to submit form data and make POST API request '/login'.
// * component should have a link to the Registration page (see design)
// * save token from API after success login to localStorage.
// ** PAY ATTENTION ** token should be saved to localStorage inside login handler function after login service response
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-2/home-task/components#login-new-component

// Module 3.
// * use 'setUserData' from 'userSlice.js' to save user's name, token and email to the store after success login.
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-3/home-task/components#login-component

// Module 4.
// * use 'setUserData' from 'userSlice.js' to add user's data to store. (DO NOT use 'user/me' [GET] request)

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "../../common";

import styles from "./styles.module.css";

export const Login = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      navigate("/courses");
    }
  }, [navigate]);

  // write your code here
  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  async function loginAuth(body) {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (!data.successful) {
      throw new Error(data.result);
    } else {
      return data;
    }
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await loginAuth({ email, password });
      localStorage.setItem("userToken", data.result);
      navigate("/courses");
    } catch (error) {
      console.log(error);
      //alert(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleLoginSubmit}>
          {/* // reuse Input component for email field // reuse Input component for
          password field // reuse Button component for 'Login' button */}
          <div className="form-group mt-3">
            <Input
              className="form-control"
              labelClassName="h6"
              labelText="Email"
              inputPlaceholder="Enter email..."
              type="email"
              id="email"
              labelExtras={<abbr title="Email is required.">*</abbr>}
              required={true}
              onChange={handleEmailInput}
            />
          </div>
          <div className="form-group  mt-3">
            <Input
              className="form-control"
              labelClassName="h6"
              labelText="Password"
              inputPlaceholder="Enter password..."
              type="password"
              id="password"
              required={true}
              labelExtras={<abbr title="Password is required.">*</abbr>}
              onChange={handlePasswordInput}
            />
          </div>
          <Button
            className="btn btn-primary mt-3"
            type="submit"
            buttonText="Login"
          />
        </form>
        <p>
          <Link to="/registration">Go to Registration page</Link>
          {/* If you don't have an account you may&nbsp; // use <Link /> component
          for navigation to Registration page */}
        </p>
      </div>
    </div>
  );
};
