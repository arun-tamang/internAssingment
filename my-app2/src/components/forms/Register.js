import React from 'react';
import { register } from '../../services/userService/registerService';


const Register = () => {
  let userDetails = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  let handlefirstNameChange = (e) => {
    userDetails.firstName = e.target.value;
  }

  let handlelastNameChange = (e) => {
    userDetails.lastName = e.target.value;
  }

  let handleEmailChange = (e) => {
    userDetails.email = e.target.value;
  }

  let handlePasswordChange = (e) => {
    userDetails.password = e.target.value;
  }

  let handleRegisterClick = () => {
    console.log(userDetails);
    register(userDetails);
  }

  return(
    <div>
      <input type='text' onChange={handlefirstNameChange} placeholder='firstName' />
      <input type='text' onChange={handlelastNameChange} placeholder='lastName' />
      <input type='email' onChange={handleEmailChange} placeholder='user@mail.com' />
      <input type='password' onChange={handlePasswordChange} placeholder='password' />

      <button onClick={handleRegisterClick}> Register </button>
    </div>
  )
}

export default Register;