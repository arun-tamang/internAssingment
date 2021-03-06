import SERVICES from '../services/serviceContainer';

// request tokens
export function requestTokens(userInfo) {
  return {
    type: 'REQUEST_TOKENS',
    payload: {
      userInfo
    }
  };
}

export function receiveTokensAndUserDetails(tokens, userDetails) {
  return {
    type: 'RECEIVE_TOKENS_AND_USERDETAILS',
    payload: {
      tokens,
      userDetails
    }
  };
}

export function removeTokensAndUserDetails() {
  return {
    type: 'REMOVE_TOKENS_AND_USERDETAILS'
  };
}

export function setAuthentication(authenticated = false) {
  return {
    type: 'SET_AUTHENTICATION',
    payload: {
      authenticated
    }
  };
}

export function setLoginEmail(email) {
  return {
    type: 'SET_LOGIN_EMAIL',
    payload: {
      email
    }
  };
}

export function setLoginPassword(password) {
  return {
    type: 'SET_LOGIN_PASSWORD',
    payload: {
      password
    }
  };
}

// login
export function login(userInfo) {
  return (dispatch) => {
    // dispatch(requestTokens(userInfo));
    return SERVICES.login(userInfo)
      .then(
      (response) => {
        let { tokens } = response.data;
        let userDetails = response.data.userInfo;
        SERVICES.setTokenInHeader(tokens.accessToken);
        dispatch(receiveTokensAndUserDetails(tokens, userDetails));
        dispatch(setAuthentication(true));
        return { tokens, userDetails };
      },
      (err) => console.log(err)
      )
      .catch((err) => console.log(err));
    // It's a bad idea to use catch(acc to docs) but this prevents from app crashing because
    // services.login throws an error.
  };
}

// register
export function register(newUserDetails) {
  return (dispatch) => {
    return SERVICES.register(newUserDetails).then((response) => {
      return response;
    });
  };
}

export function resetStore(defaultState) {
  return {
    type: 'RESET_STORE',
    payload: {
      defaultState
    }
  };
}
