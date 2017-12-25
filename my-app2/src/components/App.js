import React, { Component } from 'react';
import '../styles/App.css';
import TodoList from './todoList/TodoList.js';
import Home from './home/HomePage';
import Login from './forms/Login';
import Register from './forms/Register';
import NavBar from './navs/navigation';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { setTokenInHeader } from '../services/axiosService';


class App extends Component {
  constructor (props) {
    super(props);
    // this.handlers = {
    //   handleEdit: this.handleEdit.bind(this)
    // };
    this.state = {
      authenticated: false,
      tokens: '',
      userDetails: ''
    };
    // this.tokens = '';
    // this.userDetails = '';
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  // handleEdit () {
  //   this.setState();
  // }

  handleLogIn (logResult, receivedData) {
    console.log('back in app');
    // console.log('receivedData: ', receivedData);
    if (logResult === true) {
      this.setState({
        authenticated: true,
        tokens: receivedData.tokens,
        userDetails: receivedData.userDetails
      });
    }
    // this.tokens = receivedData.tokens;
    // this.userDetails = receivedData.userDetails;
    setTokenInHeader(this.state.tokens);
  }

  handleLogOut () {
    console.log('log out back in app');
    this.setState({
      authenticated: false,
      tokens: '',
      userDetails: ''
    });
  }

  render () {
    console.log(this.state.authenticated);
    return (
      <Router>
        <div className='App'>
          <NavBar authenticated={this.state.authenticated} handleLogOut={this.handleLogOut}/>
          <Route exact path='/' component={Home} />
          <Route path='/login' render={(routerProps) =>
            Login(routerProps, this.handleLogIn, this.state.authenticated)
          } />
          <Route path='/register' render={(routerProps) =>
            Register(routerProps)
          } />
          <Route path='/todo' render={(props) => (
            this.state.authenticated ? (
              <TodoList tokens={this.state.tokens} userDetails={this.state.userDetails}/>
            ) : (
              <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
              }} />
            )
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
