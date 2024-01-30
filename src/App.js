import "./App.css";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import LoginForm from "./LoginForm";
import WelcomePage from "./WelcomePage";
import {
  utilityGetEmailLogged,
  utilityGetUserLogged,
  utilityGetUsers,
} from "./utility";

const App = () => {
  const [email, setEmail] = useState(utilityGetEmailLogged());
  /*const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });*/
  useEffect(() => {
    //setEmail(email+email.length);
    console.log("DidMount");
    console.log(utilityGetEmailLogged());
  }, [email]);

  //const emailLength = useMemo(() => email.length, [email]);

  const saveEmailLogged = (email) => {
    setEmail(email);
    localStorage.setItem("email", email);
  };
  const deleteEmailLogged = () => {
    console.log("Email rimossa correttamente");
    setEmail("");
    localStorage.removeItem("email");
  };
  const onClickLogin = useCallback(
    (email) => {
      saveEmailLogged(email);
      saveUserToStorage();
    },
    [email]
  );

  const onClickLogout = () => {
    deleteEmailLogged();
  };

  const saveUserToStorage = () => {
    const user = utilityGetUserLogged();
    if (!!user) {
      updateUser(user);
    } else {
      saveNewUser();
    }
  };

  const updateUser = (user) => {
    const users = utilityGetUsers();
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
    //users = newUsers;
    //setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  const saveNewUser = () => {
    const users = utilityGetUsers();
    const email = utilityGetEmailLogged();
    console.log(email);
    const newUsers = [
      ...users,
      {
        email: email,
        onAccess: new Date().toLocaleString(),
        lastAccess: "",
        counter: 1,
      },
    ];
    //users = newUsers;
    //setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  return (
    <div>
      {!!email ? (
        <WelcomePage
          //email={email}
          onClickLogout={onClickLogout}
          //users={users}
          //setUsers={setUsers}
          //getEmailLogged={utilityGetEmailLogged}
          //getUserLogged={utilityGetUserLogged}
        />
      ) : (
        <LoginForm onClickLogin={onClickLogin} />
      )}
    </div>
  );
};

export default App;
