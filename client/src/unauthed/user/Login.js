import React, {useState} from "react";
import config from "../../api/api";
import axios from "axios";
import "../../styles/style.css";

const UserLogin = () => {
  const api = axios.create({
    baseURL: config,
  });

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

    await api.post("/users", db_columns)
    .then(function (response){
      navigatePage(response);
    })
    .catch(function (error){
      console.log(error);
    });
  }

  const navigatePage = (response) => {
    if (response.statusText === "OK"){  
      window.location = "/myfood";
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
