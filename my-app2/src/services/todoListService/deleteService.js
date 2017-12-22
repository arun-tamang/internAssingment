import myAxios from '../../myAxios.js';
// import { getTodoIndex } from './todoService';

export function deleteTodo (userId, id) {
  console.log('USERID', userId);
  let myUrl = '/users/' + userId + '/todo/' + id;
  return myAxios.delete(myUrl)
    .then((response) => {
      // console.log('delete response', response.data);
      // let todoProperties = this.state.todoProps.slice();
      // let index = getTodoIndex(id, this.todoProps);
      // console.log('index: ', index);
      // if (!(index === -2)) {
      //   if (todoProperties.length === this.pageSize) {
      //     this.fetchAfterDelete = true;
      //   } else {
      //     this.fetchAfterDelete = false;
      //   }
      //   todoProperties.splice(index, 1);
      //   this.currentNumTodos--;
      //   console.log('current no. of todos: ', this.currentNumTodos);
      // }
      // if (this.fetchAfterDelete === true) {
      //   this.fetchTodos();
      // } else {
      //   this.setState({todoProps: todoProperties});
      // }
      // return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}
