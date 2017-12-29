import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

// import default data

const CURRENT_USER = JSON.parse(localStorage.currentUser);

const defaultState = {
  // default data here
  todoList: {
    showPopUp: false,
    title: 'Your Todos:',
    todoProps: [],
    popUpEditTitle: '',
    todoToEdit: -1,
    searchValue: {
      keywords: '',
      tags: ''
    },
    metadata: {}
  },
  user: {
    authenticated: CURRENT_USER.authenticated,
    userDetails: CURRENT_USER.userDetails
  },
  logInDetails: {
    email: '',
    password: ''
  },
  // registerDetails: {
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   password: ''
  // }
};

// const store = createStore(
//   rootReducer,
//   defaultState,
//   applyMiddleware(thunkMiddleware),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  defaultState,
  composeEnhancers(applyMiddleware(thunk))
);


export default store;
