import { Button } from "../../../../common";

import styles from "./styles.module.css";

export const AuthorItem = ({
  author,
  handleAddAuthor,
  handleDeleteAuthor,
  showAddButton,
  showDeleteButton,
}) => (
  <div className={styles.authorItem} data-testid="authorItem">
    <span>{author.name}</span>
    {showAddButton && (
      <Button
        buttonText="Add author"
        data-testid="addAuthor"
        handleClick={handleAddAuthor}
      />
    )}
    {showDeleteButton && (
      <Button
        buttonText="Delete author"
        data-testid="deleteAuthor"
        handleClick={handleDeleteAuthor}
      />
    )}
  </div>
);
