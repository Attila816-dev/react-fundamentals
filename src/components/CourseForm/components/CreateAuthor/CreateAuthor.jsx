// Module 1.
// You don't need this component for Module 1.

// Module 2.
// * Uncomment component code with imports
// * Use this component for author creation functionality
// * Pass callback 'onCreateAuthor' from CourseForm.jsx to return author's info {id: string, name: string}

// Module 3.
// Remove 'onCreateAuthor' from props => use 'dispatch' and 'saveAuthor' from 'authorsSlice.js' to save new author to the store

import React, { useState } from "react";
import styles from "./styles.module.css";
import { Input, Button } from "../../../../common";

export const CreateAuthor = ({ onCreateAuthor }) => {
  // write your code here

  const [name, setName] = useState("");

  const handleAuthorName = (event) => {
    setName(event.target.value);
  };

  return (
    <div className={styles.newAuthorContainer}>
      <h2>Author Name</h2>
      {/* // reuse Input component with data-testid="createAuthorInput" attribute
      //reuse Button component with data-testid="createAuthorButton" attribute */}
      <Input
        labelText="Author Name"
        inputPlaceholder="Enter name..."
        type="text"
        id="createAuthorInput"
        required={true}
        onChange={handleAuthorName}
        inputValue={name}
        data-testid="createAuthorInput"
      />
      <Button
        handleClick={() => {
          onCreateAuthor({ name });
        }}
        data-testid="createAuthorButton"
        buttonText="Create Author"
      />
    </div>
  );
};
