export const getCurrentDate = () => {
  let today = new Date();
  let date = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;
  return date;
};
