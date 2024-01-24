import "./App.css";
import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import WelcomePage from "./WelcomePage";

const App = () => {
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const getEmailLogged = () => {
    const email = localStorage.getItem("email");
    return email;
  };
  const [email, setEmail] = useState(getEmailLogged());
  /*const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });*/
  let users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  const saveEmailLogged = (email) => {
    setEmail(email);
    localStorage.setItem("email", email);
  };

  const deleteEmailLogged = () => {
    console.log("Email rimossa correttamente");
    setEmail("");
    localStorage.removeItem("email");
  };

  const onClickLogin = (email) => {
    saveEmailLogged(email);
    saveUserToStorage();
  };

  const onClickLogout = () => {
    deleteEmailLogged();
  };

  const saveUserToStorage = () => {
    const user = getUserLogged();
    if (!!user) {
      updateUser(user);
    } else {
      saveNewUser();
    }
  };

  const updateUser = (user) => {
    const newUsers = users.map((u) =>
      u.email === user.email
        ? {
            ...u,
            onAccess: new Date().toLocaleString(),
            lastAccess: u.onAccess,
            counter: u.counter + 1,
          }
        : u
    );
    users = newUsers;
    //setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  const saveNewUser = () => {
    const newUsers = [
      ...users,
      {
        email: getEmailLogged(),
        onAccess: new Date().toLocaleString(),
        lastAccess: "",
        counter: 1,
      },
    ];
    users = newUsers;
    //setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  const getUserLogged = () => {
    const emailLogged = getEmailLogged();
    return users.find((user) => user.email === emailLogged);
  };

  return (
    <div>
      {email ? (
        <WelcomePage
          email={email}
          onClickLogout={onClickLogout}
          users={users}
          //setUsers={setUsers}
          getEmailLogged={getEmailLogged}
          getUserLogged={getUserLogged}
        />
      ) : (
        <LoginForm onClickLogin={onClickLogin} validateEmail={validateEmail} />
      )}
    </div>
  );
};

export default App;
