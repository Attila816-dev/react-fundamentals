// Module 1.
// You don't need this component for Module 1.

// Module 2.
// * Uncomment component code with imports
// * Use this component for author creation functionality
// * Pass callback 'onCreateAuthor' from CourseForm.jsx to return author's info {id: string, name: string}

// Module 3.
// Remove 'onCreateAuthor' from props => use 'dispatch' and 'saveAuthor' from 'authorsSlice.js' to save new author to the store

import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { Input, Button } from "../../../../common";
import { getAuthorsSelector } from "../../../../store/selectors";
import { createAuthorThunk } from "../../../../store/thunks/authorsThunk";
import store from "../../../../store/index";

export const CreateAuthor = () => {
  // write your code here
  let authorsList = useSelector(getAuthorsSelector);

  const [name, setName] = useState("");

  const handleAuthorName = (event) => {
    setName(event.target.value);
  };

  const handleCreateAuthor = () => {
    if (name.length < 2) {
      alert("Author name should be longer than 2 characters.");
      return false;
    } else if (
      authorsList &&
      authorsList.find((author) => author.name === name)
    ) {
      alert("This author is already in the list.");
    } else {
      store.dispatch(createAuthorThunk({ name }));
    }
  };

  return (
    <div className={styles.newAuthorContainer}>
      <h2>Author Name</h2>
      {/* // reuse Input component with data-testid="createAuthorInput" attribute
      //reuse Button component with data-testid="createAuthorButton" attribute */}
      <Input
        labelText=""
        inputPlaceholder="Enter name..."
        type="text"
        id="createAuthorInput"
        required={true}
        onChange={handleAuthorName}
        inputValue={name}
        data-testid="createAuthorInput"
      />
      <Button
        handleClick={handleCreateAuthor}
        data-testid="createAuthorButton"
        buttonText="Create Author"
      />
    </div>
  );
};
