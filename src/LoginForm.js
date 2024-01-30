import React, { useState } from "react";
import { utilityValidateEmail } from "./utility";

const LoginForm = ({ onClickLogin }) => {
  const [inputValue, setInputValue] = useState("");
  const isEmailValid = utilityValidateEmail(inputValue);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 text-center mt-5">
          <input
            id="input-login"
            className="form-control"
            placeholder="Insert Email"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            id="button-login"
            className="btn btn-primary"
            disabled={!isEmailValid}
            onClick={() => onClickLogin(inputValue)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
