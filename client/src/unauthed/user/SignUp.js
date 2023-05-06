import React, {useState} from "react";
import "../../styles/style.css"

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    emailAddress: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState({
    emailAddress: '',
    password: '',
    confirmPassword: ''
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
 
const createAccount = () => {
  if (validateCredentials()){console.log("creating account")}
}


    return (
      <div id="login">
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
  