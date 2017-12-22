import myAxios from '../../myAxios.js';

export function downloadTodos (id) {
  // console.log('from downoload');
  // console.log(id);
  // console.log(tokens);
  // console.log('inside downloadTodos');
  // myAxios.defaults.headers = {'Authorization': tokens.accessToken, 'Refresh': tokens.refreshToken};
  let myUrl = '/users/' + id + '/todo';
  return myAxios.get(myUrl)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
