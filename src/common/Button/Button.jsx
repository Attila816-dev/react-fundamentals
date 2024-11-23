import React from "react";

import styles from "./styles.module.css";

// Module 1:
// * use this component in components: Header, Courses
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-1/home-task/components#button-component

export const Button = ({
  buttonText,
  handleClick,
  className,
  type,
  "data-testid": dataTestId,
}) => (
  <button
    className={className || styles.button}
    onClick={handleClick}
    type={type || "button"}
    data-testid={dataTestId}
  >
    {buttonText}
  </button>
);
