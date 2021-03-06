import myAxios from '../../myAxios';

export function editTodo(newName, id, userId) {
  let myUrl = '/users/' + userId + '/todo/' + id;

  return myAxios.put(myUrl, { name: newName }).then(response => {
    console.log('from edit', response.data);
    return response;
  });
}
