const removeTokensAndUserDetails = (state) => {
  return {
    ...state,
    tokens: '',
    userDetails: ''
  };
};

const receiveTokensAndUserDetails = (state, action) => {
  return {
    ...state,
    tokens: action.tokens,
    userDetails: {
      email: action.userDetails.email,
      id: action.userDetails.id
    }
  };
};

const setAuthentication = (state, action) => {
  return {
    ...state,
    authenticated: action.authenticated
  };
};


const user = (state = [], action) => {
  // console.log('from user:', action.type);
  // return action;
  switch (action.type) {
    case 'SET_AUTHENTICATION':
      return setAuthentication(state, action);
    case 'REQUEST _TOKENS':
      console.log('request tokens dispatched');
      return state;
    case 'RECEIVE_TOKENS_AND_USERDETAILS':
      console.log('receive tokens and userDetails dispatched');
      return receiveTokensAndUserDetails(state, action);
    case 'REMOVE_TOKENS_AND_USERDETAILS':
      console.log('receive tokens and userDetails dispatched');
      return removeTokensAndUserDetails(state);
    // case 'RESET_STORE':
    //   return action.defaultState.user;
    default:
      return state;
  }
};

export default user;
