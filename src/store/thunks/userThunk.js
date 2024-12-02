import { getCurrentUser, logout } from "../../services";

export const getUserThunk = () => {
  return async function (dispatch) {
    const user = await getCurrentUser(localStorage.getItem("token"));
    dispatch({ type: "user/setUserData", payload: user });
  };
};

export const logoutThunk = () => {
  return async function (dispatch) {
    await logout(localStorage.getItem("token"));
    dispatch({ type: "user/removeUserData" });
  };
};
