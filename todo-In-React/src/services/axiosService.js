import myAxios from '../myAxios.js';

export function setTokenInHeader (tokens) {
  myAxios.defaults.headers = {
    Authorization: tokens.accessToken,
  };
  // console.log('from setTokenINHeader');
  // console.log(myAxios.defaults.headers);
}

