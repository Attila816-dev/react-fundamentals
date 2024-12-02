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

export const getCurrentUser = async (token) => {
  // write your code here
  const response = await fetch("http://localhost:4000/users/me", {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const updateCourseService = async (course, token) => {
  // write your code here
  const response = await fetch(`http://localhost:4000/courses/${course.id}`, {
    method: "PUT",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });
  return await response.json();
};

export const logout = async (token) => {
  // write your code here
  await fetch("http://localhost:4000/logout", {
    method: "DELETE",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });

  return;
};

export const deleteCourseService = async (id, token) => {
  // write your code here
  const response = await fetch(`http://localhost:4000/courses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const createCourse = async (course, token) => {
  // write your code here
  const response = await fetch("http://localhost:4000/courses/add", {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });
  return await response.json();
};

export const createAuthor = async (author, token) => {
  // write your code here
  const response = await fetch("http://localhost:4000/authors/add", {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(author),
  });

  return await response.json();
};
