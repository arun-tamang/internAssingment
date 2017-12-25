import myAxios from '../../myAxios.js';

export function downloadTodos (id) {
  let myUrl = '/users/' + id + '/todo';
  return myAxios.get(myUrl)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
