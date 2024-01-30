import React from "react";
import { utilityGetUserLogged } from "./utility";

const WelcomePage = ({ email, onClickLogout }) => {
  const user = utilityGetUserLogged();
  console.log(user.lastAccess);
  if (user && user.counter > 1)
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6 text-left">
            <p>Numero accessi: {user.counter}</p>
            <p>Ultimo accesso: {user.lastAccess.toString()}</p>
          </div>
          <div className="col-md-6 text-right">
            <button
              id="button-logout"
              className="btn btn-primary"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12 text-center">
            <h1 className="mt-5">Bentornat* {email}</h1>
          </div>
        </div>
      </div>
    );
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12 text-right">
          <button
            id="button-logout"
            className="btn btn-primary"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12 text-center">
          <h1 className="mt-5">Benvenut* {email}</h1>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
