import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, { payload }) => {
      state = payload;
    },
    saveCourse: (state, { payload }) => {
      state = [...state, payload];
    },
    deleteCourse: (state, { payload }) => {
      state = state.filter((course) => payload !== course.id);
    },
    updateCourse: (state, { payload }) => {
      state = state.map((course) =>
        course.id === payload.id ? payload : course
      );
    },
  },
});

// use these actions in your components / thunks
export const { setCourses, saveCourse, deleteCourse, updateCourse } =
  coursesSlice.actions;

export default coursesSlice.reducer;
