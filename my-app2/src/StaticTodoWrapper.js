import React, { Component } from 'react';
import {Todo} from './Todo.js';
import {AddTodo} from './AddTodo.js';
import * as axios from 'axios';

class TodoWrapper extends Component {
  constructor () {
    super();
    this.state = {
      title: 'Your Todos:',
      totalTodosCreated: 4,
      todoProps: [],
      todos: [1, 2, 3, 4]
    };
    this.userInfo = {"email": "johnny@bravo.com", "password": "password2"};
    this.tokens = {};
    this.userDetails = -20;
    this.currentNumTodos = 4;
    this.buttonStyle = {
      margin: '10px 10px 10px 0'
    };
    this.handleAddClick = this.handleAddClick.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.getTodoIndex = this.getTodoIndex.bind(this);
    this.createTodo = this.createTodo.bind(this);
  }

  getTodoProps () {
    let todoProperties = this.state.todoProps.slice();
    for (let i = 0; i < this.state.totalTodosCreated; i++) {
      todoProperties[i] = {key: i, title: 'Random Task'};
    }
    this.setState({todoProps: todoProperties});
    return todoProperties;
  }

  async downloadTodoProps () {
    let myUrl = 'http://localhost:8848/api/users/' + this.userDetails.id + '/todo';
    // let myHeader = {Authorization: this.tokens.accessToken,
    //   Refresh: this.tokens.refreshToken};
    // console.log(myHeader);
    // console.log(myUrl);
    let downloadResponse = await axios({
      method: 'get',
      url: myUrl,
      headers: {'Authorization': this.tokens.accessToken, 'Refresh': this.tokens.refreshToken}
    })
      .then(function (response) {
        // console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    // console.log(downloadResponse.data);
    return downloadResponse.data;
  }

  createTodo (title, key) {
    this.currentNumTodos++;
    return (
      <Todo key={key} id={key} title={title} handleDelete={this.deleteTodo} />
    );
  }

  setTodoTitles (props) {
    let todoArr = this.state.todos.slice();
    // console.log('todoArr before modification');
    // console.log(todoArr);
    for (let i = 0; i < this.state.totalTodosCreated; i++) {
      todoArr[i] = this.createTodo(props[i].title, props[i].key);
      // todoArr[i] = <Todo
      //   key={props[i].key}
      //   id={props[i].key}
      //   title={props[i].title}
      //   handleDelete={this.deleteTodo} />;
    }
    return todoArr;
  }

  handleAddClick (title) {
    let todoArr = this.state.todos.slice();
    console.log('before adding');
    console.log(todoArr);
    // console.log('title from handleAddClick', title);
    let newKey = this.state.totalTodosCreated;
    todoArr.push(this.createTodo(title, newKey));
    // using push is better because using index was not reliable for me as i had to use
    // currentNumTodos variable not totalTodosCreated for insertion and i didn't have to separate
    // variables previously.
    newKey++;
    this.setState({todos: todoArr, totalTodosCreated: newKey});
    console.log('after adding');
    console.log(todoArr);
  }

  getTodoIndex (id) {
    console.log(this.state.todos);
    for (let i = 0; i < this.state.todos.length; i++) {
      console.log('this.state.todos.id: ', this.state.todos[i].props.id);
      if (this.state.todos[i].props.id === id) {
        // console.log('this.state.todos.id: ', this.state.todos.id);
        return i;
      }
    }
    return -2;
  }

  deleteTodo (id) {
    // console.log('deleteTodo called with id: ', id);
    let todoArr = this.state.todos.slice();
    // let currentNumTodos = this.state.currentNumTodos;
    // todoArr.splice(id,1);
    // if you use splice to remove you will need to update ids of all todos
    let index = this.getTodoIndex(id);
    // console.log('index: ', index);
    if (!(index === -2)) {
      // console.log('now splicing..........');
      console.log('before splicing');
      console.log(todoArr);
      todoArr.splice(index, 1);
      this.currentNumTodos--;
      console.log('current no. of todos: ', this.currentNumTodos);
      console.log('after splicing');
      console.log(todoArr);
    }
    this.setState({todos: todoArr});
  }

  async login (userInfo) {
    let loginResponse = await axios.post('http://localhost:8848/api/admin/login', userInfo)
    .then(function (response) {
      // console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    // console.log('from login');
    // console.log(userInfo);
    // console.log(loginResponse.tokens);
    let tokens = loginResponse.tokens;
    let userDetails = loginResponse.userInfo;
    return {tokens, userDetails};
  }

  componentWillMount () {
    console.log('will mount called');
    let props = this.getTodoProps();
    let todoArr = this.setTodoTitles(props);
    // console.log(todoArr);
    this.setState({todos: todoArr});
  }

  extractTodos (toExtract) {
    // console.log(toExtract.length);
    let todoProperties = [];
    for (let i = 0; i < toExtract.length; i++) {
      todoProperties[i] = {key: toExtract[i].id, title: toExtract[i].name};
    }
    // this.setState({todoProps: todoProperties});
    return todoProperties;
  }

  async componentDidMount () {
    console.log('did mount called');
    let logResponse = await this.login(this.userInfo);
    this.tokens = logResponse.tokens;
    this.userDetails = logResponse.userDetails;
    console.log(this.userDetails);
    let downloadedTodos = await this.downloadTodoProps();
    // console.log(downloadedTodos.data);
    let extractedTodos = this.extractTodos(downloadedTodos.data);
    // console.log(extractedTodos);
    // remove existing todos also in setState
    this.setState({
      todoProps: extractedTodos,
      totalTodosCreated: extractedTodos.length,
      todos: []
    });
    let todoArr = this.setTodoTitles(extractedTodos);
    // console.log(todoArr);
    this.setState({todos: todoArr});
  }

  render () {
    // let todos = this.state.todos;
    console.log('render called');
    return (
      <div>
        <h2>{this.state.title}</h2>
        {this.state.todos}
        <AddTodo handleAddClick={this.handleAddClick} />
      </div>
    );
  }
}

export default TodoWrapper;
