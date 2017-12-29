import React from 'react';
import { Redirect } from 'react-router-dom';

const Login = (routerProps, { ...props }) => {
  const redirect = () => {
    const { from } = routerProps.location.state || { from: { pathname: '/' } };
    return <Redirect to={from} />;
  };

  const handleRegisterClick = () => {
    routerProps.history.push('/register');
  };

  return (
    props.authenticated ? (
      redirect()
    ) : (
      <div>
        <input
          type='email'
          onChange={e => props.setLoginEmail(e.target.value)}
          placeholder='user@mail.com'
        />
        <input
          type='password'
          onChange={e => props.setLoginPassword(e.target.value)}
          placeholder='password'
        />
        <button onClick={props.handleLogClick}> Log In </button>

        <p>Not registered yet?, Register Now</p>
        <button onClick={handleRegisterClick}> Register </button>
      </div>
    )
  );
};

export default Login;
