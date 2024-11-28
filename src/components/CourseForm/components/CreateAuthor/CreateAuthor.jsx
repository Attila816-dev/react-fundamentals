// Module 1.
// You don't need this component for Module 1.

// Module 2.
// * Uncomment component code with imports
// * Use this component for author creation functionality
// * Pass callback 'onCreateAuthor' from CourseForm.jsx to return author's info {id: string, name: string}

// Module 3.
// Remove 'onCreateAuthor' from props => use 'dispatch' and 'saveAuthor' from 'authorsSlice.js' to save new author to the store

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { Input, Button } from "../../../../common";
import { saveAuthor } from "../../../../store/slices/authorsSlice";
import { getAuthorsSelector } from "../../../../store/selectors";
import { v4 as uuidv4 } from "uuid";

export const CreateAuthor = () => {
  // write your code here
  const dispatch = useDispatch();
  let authorsList = useSelector(getAuthorsSelector);

  const [name, setName] = useState("");

  const handleAuthorName = (event) => {
    setName(event.target.value);
  };

  const handleCreateAuthor = () => {
    if (name.length < 2) {
      alert("Author name should be longer than 2 characters.");
      return false;
    } else if (authorsList.find((author) => author.name === name)) {
      alert("This author is already in the list.");
    } else {
      dispatch(
        saveAuthor({
          id: uuidv4().toString(),
          name: name,
        })
      );
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
