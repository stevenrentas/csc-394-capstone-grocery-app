import React, {useState} from "react";
import "../../styles/style.css";

const UserLogin = () => {

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const onInputChange = e => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  }

  async function processLogin() {
    const db_columns = {
      "username": credentials.username,
      "pword": credentials.password
    };
    const response = await fetch("http://localhost:3001/api/v1/users", {method: "POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify(db_columns)})
    .catch(error => console.error(error));

    console.log(response);
    if (response.statusText === "OK"){
      console.log("succesfully logged in!");
    }
  }

  return (
    <div id="login">
      <input placeholder="Username" id="credBox" name="username" onChange={onInputChange}></input>
      <input placeholder="Password" id="credBox" type="password" name="password" onChange={onInputChange}></input>
      <button id="authenticate" onClick={processLogin}>LOG IN</button>
      <p id="otherAuthPage"><a id="otherAuthPage" href={"/signup"}>Create an account</a></p>
    </div>
  );
};

export default UserLogin;
