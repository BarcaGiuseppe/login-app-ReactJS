export const utilityValidateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
export const utilityGetEmailLogged = () => {
  const email = localStorage.getItem("email");
  console.log(email);
  return email;
};
export const utilityGetUsers = () => {
  let users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  console.log(users);
  return users;
};

export const utilityGetUserLogged = () => {
  const emailLogged = utilityGetEmailLogged();
  const users = utilityGetUsers();
  return users.find((user) => user.email === emailLogged);
};
