import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../services/userService/logoutService';

const NavBar = (props) => {
  // console.log(props);

  const handleLogOut = () => {
    logout().then((data) => {
      console.log(data);
      props.handleLogOut();
    })
      .catch((err) => {
        console.log(err);
      });
  };

  if (props.authenticated === false) {
    return (
      <div>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/todo'>Todos</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/register'>Register</Link></li>
        </ul>
      </div>
    );
  }
  return (
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/todo'>Todos</Link></li>
        <li><Link to='/logout'><button onClick={handleLogOut}>Logout</button></Link></li>
      </ul>
    </div>
  );
};

export default NavBar;
