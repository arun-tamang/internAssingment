import myAxios from '../../myAxios';

export function editTodo (newName, id, userId) {
  let myUrl = '/users/' + userId + '/todo/' + id;
  myAxios.put(myUrl, {name: newName})
  .then(response => {
    // console.log('edit response: ', response.data.data);
  });
}
