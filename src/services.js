export const createUser = async (data) => {
  const response = await fetch("http://localhost:4000/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network Error");
  }

  return await response.json();
};

export const login = async (body) => {
  // write your code here
  const response = await fetch("http://localhost:4000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

export const getCourses = async () => {
  // write your code here
  const response = await fetch("http://localhost:4000/courses/all", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
};

export const getAuthors = async () => {
  // write your code here
  const response = await fetch("http://localhost:4000/authors/all", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
};

// export const getCurrentUser = async () => {
//   // write your code here
//   return await response.json();
// };

// export const updateCourseService = async () => {
//   // write your code here
//   return await response.json();
// };

// export const logout = async () => {
//   // write your code here
//   return await response.json();
// };

// export const deleteCourseService = async () => {
//   // write your code here
//   return await response.json();
// };

// export const createCourse = async () => {
//   // write your code here
//   return await response.json();
// };

// export const createAuthor = async () => {
//   // write your code here
//   return await response.json();
// };
