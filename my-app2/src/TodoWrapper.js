import React, { Component } from 'react';
import { Todo } from './Todo.js';
import { AddTodoForm } from './AddTodo.js';
import { SearchTodoForm } from './SearchTodo.js';
import * as axios from 'axios';

class TodoWrapper extends Component {
  constructor () {
    super();
    this.state = {
      title: 'Your Todos:',
      todoProps: []
    };
    this.todos = [1, 2, 3, 4];
    this.userInfo = {"email": "johnny@bravo.com", "password": "password2"};
    // this.userInfo = {'email': 'jane12@mail.com', 'password': 'password1'};
    this.tokens = {};
    this.userDetails = -20;
    this.currentNumTodos = 4;
    this.buttonStyle = {
      margin: '10px 10px 10px 0'
    };
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.getTodoIndex = this.getTodoIndex.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.updateTodos = this.updateTodos.bind(this);
    this.firstFetch = this.firstFetch.bind(this);
    this.fetchAfterDelete = false;
    this.fetchAfterAdd = true;
    this.pageSize = 5;
    this.pageMetaData = {};
  }

  async downloadTodoProps () {
    let myUrl = 'http://localhost:8848/api/users/' + this.userDetails.id + '/todo';
    let downloadResponse = await axios({
      method: 'get',
      url: myUrl,
      headers: {'Authorization': this.tokens.accessToken, 'Refresh': this.tokens.refreshToken}
    })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    return downloadResponse.data;
  }

  createTodo (title, key) {
    this.currentNumTodos++;
    return (
      <Todo key={key} id={key} title={title + ' :id: ' + key} handleDelete={this.deleteTodo} />
    );
  }

  handleAddClick (title) {
    let myUrl = 'http://localhost:8848/api/users/' + this.userDetails.id + '/todo';
    axios({
      method: 'put',
      url: myUrl,
      headers: {'Authorization': this.tokens.accessToken, 'Refresh': this.tokens.refreshToken},
      data: {name: title}
    })
      .then((response) => {
        let todoProperties = this.state.todoProps.slice();
        if (todoProperties.length === this.pageSize) {
          this.fetchAfterAdd = true;
        } else {
          this.fetchAfterAdd = false;
        }
        let newKey = response.data.id;
        todoProperties.unshift({key: newKey, title: title});
        this.currentNumTodos++;
        console.log('current no. of todos: ', this.currentNumTodos);
        console.log(todoProperties.length);
        if (this.fetchAfterAdd === true) {
          this.fetchTodos();
        } else {
          this.setState({todoProps: todoProperties});
        }
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getTodoIndex (id) {
    for (let i = 0; i < this.state.todoProps.length; i++) {
      if (this.state.todoProps[i].key === id) {
        return i;
      }
    }
    return -2;
  }

  handleSearchClick (input) {
    console.log(input);
    let myUrl = 'http://localhost:8848/api/users/' + this.userDetails.id + '/todo/search';
    axios({
      method: 'get',
      url: myUrl,
      params: {
        keywords: input.keywords,
        tags: input.tags
      },
      headers: {'Authorization': this.tokens.accessToken, 'Refresh': this.tokens.refreshToken}
    })
      .then((response) => {
        console.log('search response: ', response.data.data);
        let extractedTodos = this.extractTodos(response.data.data);
        this.currentNumTodos = extractedTodos.length;
        this.setState({
          todoProps: extractedTodos
        });
      });
  }

  async deleteTodo (id) {
    let myUrl = 'http://localhost:8848/api/users/' + this.userDetails.id + '/todo/' + id;
    axios({
      method: 'delete',
      url: myUrl,
      headers: {'Authorization': this.tokens.accessToken, 'Refresh': this.tokens.refreshToken}
    })
      .then((response) => {
        console.log('delete response', response.data);
        let todoProperties = this.state.todoProps.slice();
        let index = this.getTodoIndex(id);
        console.log('index: ', index);
        if (!(index === -2)) {
          if (todoProperties.length === this.pageSize) {
            this.fetchAfterDelete = true;
          } else {
            this.fetchAfterDelete = false;
          }
          todoProperties.splice(index, 1);
          this.currentNumTodos--;
          console.log('current no. of todos: ', this.currentNumTodos);
        }
        if (this.fetchAfterDelete === true) {
          this.fetchTodos();
        } else {
          this.setState({todoProps: todoProperties});
        }
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  editTodo (newName, id) {
    console.log('newName is: ', newName);
    console.log('and id is: ', id);
    let myUrl = 'http://localhost:8848/api/users/' + this.userDetails.id + '/todo/' + id;
    axios({
      method: 'put',
      url: myUrl,
      headers: {'Authorization': this.tokens.accessToken, 'Refresh': this.tokens.refreshToken},
      data: {name: newName}
    })
    .then(response => {
      console.log('edit response: ', response.data.data);
    });
  }

  updateTodos () {
    //
  }

  async login (userInfo) {
    // you need to have await here because downloadedTodos called after this login depends on tokens
    // that is only given after this post finishes and responds so login should not return before this.
    await axios.post('http://localhost:8848/api/admin/login', userInfo)
    .then((response) => {
      this.tokens = response.data.tokens;
      this.userDetails = response.data.userInfo;
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log('from login');
  }

  componentWillMount () {
    console.log('will mount called');
  }

  extractTodos (toExtract) {
    let todoProperties = [];
    for (let i = 0; i < toExtract.length; i++) {
      todoProperties[i] = {key: toExtract[i].id, title: toExtract[i].name};
    }
    return todoProperties;
  }

  async refreshAcsToken (lastConfig) {
    let myUrl = 'http://localhost:8848/api/admin/refresh';
    await axios({
      method: 'post',
      url: myUrl,
      headers: {'Authorization': this.tokens.accessToken, 'Refresh': this.tokens.refreshToken}
    })
    .then(async (response) => {
      this.tokens.accessToken = response.data.accessToken;
      console.log('token refreshed');
      lastConfig.headers.Authorization = this.tokens.accessToken;
      console.log(lastConfig.headers.Authorization);
    });
    let newResponse = await axios(lastConfig);
    return newResponse;
  }

  async fetchTodos () {
    console.log('fetchTodos called');
    let downloadedTodos = await this.downloadTodoProps();
    this.pageMetaData = downloadedTodos.metadata;
    let extractedTodos = this.extractTodos(downloadedTodos.data);
    this.currentNumTodos = extractedTodos.length;
    this.setState({
      todoProps: extractedTodos
    });
  }

  async repeatPrevRequest (lastConfig) {
    await axios(lastConfig)
    .then(response => {
      return response;
    });
  }

  async refreshAndRepeat (lastConfig) {
    let newAcsToken = await this.refreshAcsToken();
    console.log('newAcsToken from refreshAndRepeat', newAcsToken);
    lastConfig.headers.Authorization = newAcsToken;
    let response = await this.repeatPrevRequest(lastConfig);
    return response;
  }

  async firstFetch () {
    console.log('fetchTodos called');
    await this.login(this.userInfo);
    axios.interceptors.response.use(async (response) => {
      if (response.data.acsTokenSuccess === false) {
        console.log('access token needs to be refreshed');
        let lastConfig = response.config;
        let returnValue = await this.refreshAcsToken(lastConfig);
        console.log('returnValue');
        console.log(returnValue);
        return returnValue;
      }
      return response;
    }, (error) => {
      return Promise.reject(error);
    });
    this.fetchTodos();
  }

  componentDidMount () {
    console.log('did mount called');
    this.firstFetch();
  }

  render () {
    console.log('render called');
    return (
      <div>
        <h2>{this.state.title}</h2>
        {this.state.todoProps
          .map(item => <Todo key={item.key} id={item.key} title={item.title + ' :id: ' + item.key}
            handleDelete={this.deleteTodo} handleEdit={this.editTodo} />)}
        <AddTodoForm handleAddClick={this.handleAddClick} />
        <SearchTodoForm handleSearchClick={this.handleSearchClick} />
      </div>
    );
  }
}

export default TodoWrapper;
