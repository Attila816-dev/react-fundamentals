import { Button } from "../../../../common";

import styles from "./styles.module.css";

export const AuthorItem = ({ author, handleAddAuthor }) => (
  <div className={styles.authorItem} data-testid="authorItem">
    <span>{author.name}</span>
    <Button
      buttonText="Add author"
      data-testid="addAuthor"
      onClick={handleAddAuthor}
    />
  </div>
);
