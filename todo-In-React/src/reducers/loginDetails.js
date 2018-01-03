const logInDetails = (state = [], action) => {
  // console.log(state, action);
  switch (action.type) {
    case 'SET_LOGIN_EMAIL':
      // console.log(action.emailEvent.target.value);
      return { ...state, email: action.email };
    case 'SET_LOGIN_PASSWORD':
      return { ...state, password: action.password };
    case 'RESET_STORE':
      return action.defaultState.logInDetails
    default:
      return state;
  }
};

export default logInDetails;
