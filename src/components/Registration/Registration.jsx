// // Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)
//
// // Module 2.
// // * uncomment this component (ctrl + a => ctrl + /)
// // * finish markup according to the figma https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-219&mode=design&t=0FIG0iRzKcD0s16M-0
// // * add validation for fields: all fields are required. Show validation message. https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-257&mode=design&t=0FIG0iRzKcD0s16M-0
// // * render this component by route '/registration'
// // * submit form data and make POST API request '/registration'.
// // * after successful registration navigates to '/login' route.
// // * component should have a link to the Login page (see design)
// // ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-2/home-task/components#registration-new-component

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "../../common";

import styles from "./styles.module.css";

export const Registration = () => {
  // write your code here
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await registrationAuth({
        name: userName,
        email: email,
        password: password,
      });
    } catch (error) {
      console.log(error);
      //alert(error);
    }
  };

  async function registrationAuth(body) {
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (data.errors) {
      throw new Error(`${data.errors.join(",")}`);
    } else {
      navigate("/login");
    }
  }

  const handleUserNameInput = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>Registration</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-3">
            <Input
              className="form-control"
              labelClassName="h6"
              labelText="Name"
              inputPlaceholder="Enter name..."
              id="userName"
              labelExtras={<abbr title="Name is required.">*</abbr>}
              required={true}
              onChange={handleUserNameInput}
            />
          </div>
          <div className="form-group mt-3">
            <Input
              className="form-control"
              labelClassName="h6"
              labelText="Email"
              inputPlaceholder="Enter email..."
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
              id="password"
              labelExtras={<abbr title="Password is required.">*</abbr>}
              required={true}
              onChange={handlePasswordInput}
            />
          </div>
          <Button
            className="btn btn-primary mt-3"
            type="submit"
            buttonText="Registration"
          />
        </form>
        <p>
          <Link to="/login">Go to Login page</Link>
          {/* If you have an account you may&nbsp; // use <Link /> component for navigation to Login page */}
        </p>
      </div>
    </div>
  );
};
