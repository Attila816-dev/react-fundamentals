import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  name: "",
  email: "",
  token: localStorage.getItem("token"),
  role: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      state.isAuth = true;
      state.token = payload.token;
      state.name = payload.name;
      state.email = payload.email;
      state.role = payload.role;
    },
    removeUserData: (state) => {
      state.isAuth = false;
      state.token = undefined;
      state.name = "";
      state.email = "";
      state.role = "";
    },
  },
});

// use these actions in your components / thunks
export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
