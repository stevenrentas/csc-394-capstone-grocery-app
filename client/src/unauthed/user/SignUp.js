import React, {useState} from "react";
import "../../styles/style.css"

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    emailAddress: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname:'',
    username:''
  });

  const [error, setError] = useState({
    emailAddress: '',
    confirmPassword: '',
    username:''
});

const onInputChange = e => {
  const { name, value } = e.target;
  setCredentials({
    ...credentials,
    [name]: value
  });
}

const validateCredentials = () => {
  if (credentials.password !== credentials.confirmPassword){
    setError({confirmPassword: "Passwords do not match."});
    return false;
  }

  else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(credentials.emailAddress)){
    setError({emailAddress: "Enter a valid email address."});
    return false;
  }

  setError({confirmPassword: ""});
  setError({emailAddress: ""});

  return true;
}
 
async function createAccount () {
  if (validateCredentials()){
    const db_columns = {
      "username": credentials.username,
      "first_name": credentials.firstname,
      "last_name": credentials.lastname,
      "email": credentials.emailAddress,
      "pword": credentials.password
    };
    const response = await fetch("/api/v1/adduser", {method: "POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify(db_columns)})
    .catch(error => console.error(error));

    if (response.statusText === "OK"){
      console.log("succesfully created an account!");
    }
  }
}


    return (
      <div id="login">
        <input placeholder="First Name" id="credBox" name="firstname" onChange={onInputChange}></input>
        <input placeholder="Last Name" id="credBox" name="lastname" onChange={onInputChange}></input>
        <input placeholder="Username" id="credBox" name="username" onChange={onInputChange}></input>
        <input placeholder="Email Address" id="credBox" name="emailAddress" onChange={onInputChange}></input>
        {error.emailAddress && <p className='err'>{error.emailAddress}</p>}
        <input placeholder="Password" id="credBox" type="password" name="password" onChange={onInputChange}></input>
        <input placeholder="Verify Password" id="credBox" type="password" name="confirmPassword" onChange={onInputChange}></input>
        {error.confirmPassword && <p className='err'>{error.confirmPassword}</p>}
        <button id="authenticate" onClick={createAccount}>CREATE ACCOUNT</button>
        <p id="otherAuthPage"><a id="otherAuthPage" href={"/login"}>Already a member?</a></p>
      </div>
    );
  };
  
  export default SignUp;
  