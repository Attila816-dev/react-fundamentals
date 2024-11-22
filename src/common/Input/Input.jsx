// Module 1.
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-1/home-task/components#create-input-component

import styles from "./styles.module.css";

export const Input = ({
  className,
  placeholderText,
  labelText,
  labelClassName,
  labelExtras,
  inputValue,
  required,
  onChange,
  "data-testid": dataTestId,
}) => (
  <label className={labelClassName ?? styles.label}>
    {labelText}
    {labelExtras}
    <input
      onChange={onChange}
      placeholder={placeholderText}
      className={className ?? styles.input}
      value={inputValue}
      data-testid={dataTestId}
      required={required}
    />
  </label>
);
