import myAxios from '../../myAxios.js';

export function downloadTodos(id, pageNo) {
  // console.log('form downloadTodos', id);
  let page = pageNo || 1;
  let myUrl = '/users/' + id + '/todo/' + page;

  return myAxios
    .get(myUrl)
    .then(function(response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
    });
}
