import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import '../styles/App.css';
import TodoListContainer from '../containers/TodoListContainer';
import Home from './home/HomePage';
import Login from './forms/Login';
import Register from './forms/Register';
import NavBar from './navs/navigation';
import { setTokenInHeader } from '../services/axiosService';
import myAxios from '../myAxios';
import { refreshAcsToken } from '../services/resourceService/refreshAcsToken';


class App extends Component {
  constructor (props) {
    super(props);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.addInterceptor = this.addInterceptor.bind(this);
  }

  refreshAndRepeat (lastConfig) {
    return refreshAcsToken()
      .then((response) => {
        console.log('token refreshed');
        // console.log(response.data.accessToken);
        setTokenInHeader(response.data.accessToken);
        lastConfig.headers.Authorization = response.data.accessToken;
        // return this.repeatPrevRequest(lastConfig);
        return myAxios(lastConfig);
      });
  }

  addInterceptor () {
    console.log('now activating interceptor');
    myAxios.interceptors.response.use((response) => {
      if (response.data.acsTokenSuccess === false) {
        console.log('access token needs to be refreshed');
        let lastConfig = response.config;
        return this.refreshAndRepeat(lastConfig);
      }
      return response;
    }, (error) => {
      return Promise.reject(error);
    });
  }


  handleLogIn () {
    // don't pass argument in handleLogIn because first argument passed will be
    // and event when you don't pass anything. So using default value in vanilla js
    // with or(||) won't work as first argument will be event by default not undefined
    // as i used handleLogin on onclick which passes event.
    this.props.login(this.props.logInDetails)
      .then((data) => {
        if (data) {
          localStorage.setItem(
            'currentUser',
            JSON.stringify({
              refreshToken: data.tokens.refreshToken,
              userDetails: {
                email: data.userDetails.email,
                id: data.userDetails.id
              },
              authenticated: true
            })
          );
          setTokenInHeader(data.tokens);
          this.addInterceptor();
        } else {
          console.log('login unsuccessful');
        }
      });
  }

  handleLogOut () {
    console.log('log out back in app');
    this.props.setAuthentication(false);
    this.props.removeTokensAndUserDetails();
    localStorage.setItem(
      'currentUser',
      JSON.stringify({
        userEmail: '',
        authenticated: false
      })
    );
  }

  handleRegister (values) {
    // console.log(values);
    this.props.register(values)
      .then((response) => {
        console.log('back in app after registering', response);
        if (response) {
          console.log(response.data.data.email);
          console.log(response.data.data.password);
          let { email } = response.data.data;
          let { password } = response.data.data;
          this.props.setLoginEmail(email);
          this.props.setLoginPassword(password);
          this.handleLogIn();
        }
      });
  }

  checkAuthentication() {
    if (this.props.user.authenticated === true) {
      this.addInterceptor();
    }
  }


  render () {
    this.checkAuthentication();
    return (
      <Router>
        <div className='App'>
          <NavBar authenticated={this.props.user.authenticated} handleLogOut={this.handleLogOut} />
          <Route exact path='/' component={Home} />
          <Route
            path='/login'
            render={routerProps =>
            Login(
              routerProps,
              {
                setLoginEmail: this.props.setLoginEmail,
                setLoginPassword: this.props.setLoginPassword,
                authenticated: this.props.user.authenticated,
                handleLogClick: this.handleLogIn
              }
            )
          }
          />
          <Route
            path='/register'
            render={routerProps => (
              <Register
                onSubmit={this.handleRegister}
                routerProps={routerProps}
                authenticated={this.props.user.authenticated}
              />
            )}
          />
          <Route
            path='/todo'
            render={props => (
              this.props.user.authenticated ? (
                <TodoListContainer />
              ) : (
                <Redirect to={{
                  pathname: '/login',
                  state: { from: props.location }
                }}
                />
            )
          )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
