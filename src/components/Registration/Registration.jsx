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
import { createUser } from "../../services";

import styles from "./styles.module.css";

export const Registration = () => {
  // write your code here
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setShowError(true);

      if (!userName || !email || !password) {
        throw new Error("UserName, Email and password are required.");
      }

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
    const data = await createUser(body);

    if (data?.errors) {
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
              required={true}
              onChange={handleUserNameInput}
            />
            {showError && !userName ? <label>name is required.</label> : null}
          </div>
          <div className="form-group mt-3">
            <Input
              className="form-control"
              labelClassName="h6"
              labelText="Email"
              inputPlaceholder="Enter email..."
              id="email"
              required={true}
              onChange={handleEmailInput}
            />
            {showError && !email ? <label>email is required.</label> : null}
          </div>
          <div className="form-group  mt-3">
            <Input
              className="form-control"
              labelClassName="h6"
              labelText="Password"
              inputPlaceholder="Enter password..."
              id="password"
              required={true}
              onChange={handlePasswordInput}
            />
            {showError && !password ? (
              <label>Password is required.</label>
            ) : null}
          </div>
          <Button
            className="btn btn-primary mt-3"
            type="submit"
            buttonText="Registration"
          />
        </form>
        <p>
          If you have an account you may{" "}
          <Link to="/login">Go to Login page</Link>
        </p>
      </div>
    </div>
  );
};
