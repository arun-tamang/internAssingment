import React from 'react';
import { login } from '../../services/userService/loginService';
import { Redirect } from 'react-router-dom';

const Login = (routerProps, cbLogin, authenticated) => {
  let logInfo = {
    email: '',
    password: ''
  };

  let handleEmailChange = (e) => {
    logInfo.email = e.target.value;
  };

  let handlePasswordChange = (e) => {
    logInfo.password = e.target.value;
  };

  let handleLogClick = () => {
    console.log(logInfo);
    login(logInfo)
    .then((response) => {
      let tokens = response.data.tokens;
      let userDetails = response.data.userInfo;
      authenticated = true;
      // const { from } = routerProps.location.state || { from: { pathname: '/register' } };
      cbLogin(authenticated, {userDetails, tokens});
      // return {tokens, userDetails, loggedIn};
    })
    .catch((err) => {
      console.log(err);
    });
    // authenticated = true;
    // redirect();
  };

  let redirect = () => {
    const { from } = routerProps.location.state || { from: { pathname: '/register' } };
    console.log('redirecting');
    return <Redirect to={from} />;
    // console.log(routerProps);
  };

  let handleRegisterClick = () => {
    routerProps.history.push('/register');
  };

  // console.log('log in called: authenticated: ', authenticated);

  return (
    authenticated ? (
      redirect()
    ) : (
      <div>
        <input type='email' onChange={handleEmailChange} placeholder='user@mail.com' />
        <input type='password' onChange={handlePasswordChange} placeholder='password' />
        <button onClick={handleLogClick}> Log In </button>

        <p>Not registered yet?, Register Now</p>
        <button onClick={handleRegisterClick}> Register </button>
      </div>
    )
  );
};

export default Login;
