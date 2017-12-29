import myAxios from '../../myAxios';

export function addTodo (userId, title, tags) {
  let myUrl = '/users/' + userId + '/todo';
  let tagIds = tags.replace(' ', '').split(',');
  return myAxios.put(myUrl, {name: title, tagIds: tagIds})
    .then((response) => {
      // let todoProperties = this.state.todoProps.slice();
      // if (todoProperties.length === this.pageSize) {
      //   this.fetchAfterAdd = true;
      // } else {
      //   this.fetchAfterAdd = false;
      // }
      // let newKey = response.data.id;
      // console.log(newKey);
      // todoProperties.unshift({key: newKey, title: title});
      // if (this.fetchAfterAdd === true) {
      //   this.fetchTodos();
      // } else {
      //   this.setState({todoProps: todoProperties});
      // }
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}
