import React from "react";
import "../../styles/style.css";

const UserLogin = () => {
  return (
    <div id="login">
      <input placeholder="Email Address" id="credBox"></input>
      <input placeholder="Password" id="credBox" type="password" name="password"></input>
      <button id="authenticate">LOG IN</button>
      <p id="otherAuthPage"><a id="otherAuthPage" href={"/signup"}>Create an account</a></p>
    </div>
  );
};

export default UserLogin;
