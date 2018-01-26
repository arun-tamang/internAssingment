import myAxios from '../../myAxios';

export function addTodo(userId, title, tags) {
  let myUrl = '/users/' + userId + '/todo';
  // let tagIds = tags.replace(' ', '').split(',');

  return myAxios
    .put(myUrl, { name: title, tagIds: tags })
    .then((response) => {
      console.log('from add', response.data);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
}
