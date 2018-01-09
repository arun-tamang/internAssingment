import myAxios from '../myAxios.js';

export function setTokenInHeader (token) {
  myAxios.defaults.headers = {
    Authorization: token
  };
  // console.log('from setTokenINHeader');
  // console.log(myAxios.defaults.headers);
}
