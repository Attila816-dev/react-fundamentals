import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  name: "",
  email: "",
  token: localStorage.getItem("token"),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      state = payload;
      localStorage.setItem("token", state.token);
    },
    removeUserData: (state, { payload }) => {
      state.isAuth = false;
      state.token = undefined;
      state.name = "";
      state.email = "";
      localStorage.removeItem("token");
    },
  },
});

// use these actions in your components / thunks
export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
