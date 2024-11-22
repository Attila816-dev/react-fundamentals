// Module 1.
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-1/home-task/components#create-input-component

import styles from "./styles.module.css";

export const Input = ({
  className,
  placeholderText,
  labelText,
  labelClassName,
  inputValue,
  onChange,
  "data-testid": dataTestId,
}) => (
  <label className={labelClassName ?? styles.label}>
    {labelText}
    <input
      onChange={onChange}
      placeholder={placeholderText}
      className={className ?? styles.input}
      value={inputValue}
      data-testid={dataTestId}
    />
  </label>
);
