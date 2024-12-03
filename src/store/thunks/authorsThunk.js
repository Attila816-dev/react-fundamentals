import { getAuthors, createAuthor } from "../../services";

export const getAuthorsThunk = () => {
  return async function (dispatch) {
    const authors = await getAuthors();
    dispatch({ type: "authors/setAuthors", payload: authors.result });
  };
};

export const createAuthorThunk = (author) => {
  return async function (dispatch) {
    const response = await createAuthor(author, localStorage.getItem("token"));
    dispatch({ type: "authors/saveAuthor", payload: response.result });
  };
};
