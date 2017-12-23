import React, { Component } from 'react';
// import logo from './logo.svg';
import '../styles/App.css';
import TodoList from './todoList/TodoList.js';
import Home from './Home';
import Login from './forms/Login';
import Register from './forms/Register';
// import Todo from './privateTest';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

// let data = {title: 'hello there'};

class App extends Component {
  constructor (props) {
    super(props);
    this.handlers = {
      handleEdit: this.handleEdit.bind(this)
    };
    this.state = {
      authenticated: false,
      tokens: '',
      userDetails: ''
    };
    // this.tokens = '';
    // this.userDetails = '';
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleEdit () {
    this.setState();
  }

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
    this.tokens = receivedData.tokens;
    this.userDetails = receivedData.userDetails;
  }

  render () {
    console.log(this.state.authenticated);
    return (
      <Router>
        <div className='App'>
          {/* you need extra wrapper div as router can only have one child element */}
          <div>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/register'>Register</Link></li>
              <li><Link to='/todo'>Todos</Link></li>
            </ul>
          </div>
          <Route exact path='/' component={Home} />
          <Route path='/login' render={(routerProps) =>
            Login(routerProps, this.handleLogIn, this.state.authenticated)
          } />
          <Route path='/register' component={Register} />
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
          {/* <Route path='/todo' render={(props) => (
            this.state.authenticated ? (
              Todo(props, data, this.handlers)
            ) : (
              <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
              }} />
            )
          )} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
