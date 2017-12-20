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

  // getTodoProps () {
  //   let todoProperties = this.state.todoProps.slice();
  //   for (let i = 0; i < 2; i++) {
  //     todoProperties[i] = {key: i, title: 'Random Task'};
  //   }
  //   return todoProperties;
  // }

  async downloadTodoProps () {
    let myUrl = 'http://localhost:8848/api/users/' + this.userDetails.id + '/todo';
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
      <Todo key={key} id={key} title={title + ' :id: ' + key} handleDelete={this.deleteTodo} />
    );
  }

  handleAddClick (title) {
    // console.log('new title: ', title);
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
        // this.setState({todoProps: todoProperties});
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getTodoIndex (id) {
    // console.log(this.state.todos);
    for (let i = 0; i < this.state.todoProps.length; i++) {
      // console.log('this.state.todoProps.key: ', this.state.todoProps[i].key);
      if (this.state.todoProps[i].key === id) {
        // console.log('this.state.todoProps.key: ', this.state.todoProps.key);
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
      // console.log(response.data);
      this.tokens = response.data.tokens;
      this.userDetails = response.data.userInfo;
      // console.log(this.userDetails);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log('from login');
  }

  componentWillMount () {
    console.log('will mount called');
    // let todoProperties = this.getTodoProps();
    // this.setState({todoProps: todoProperties});
  }

  extractTodos (toExtract) {
    // console.log('toExtract');
    // console.log(toExtract);
    let todoProperties = [];
    for (let i = 0; i < toExtract.length; i++) {
      todoProperties[i] = {key: toExtract[i].id, title: toExtract[i].name};
    }
    // this.setState({todoProps: todoProperties});
    return todoProperties;
  }

  async refreshAcsToken (lastConfig) {
    // console.log('refreshAcsToken called............');
    let myUrl = 'http://localhost:8848/api/admin/refresh';
    await axios({
      method: 'post',
      url: myUrl,
      headers: {'Authorization': this.tokens.accessToken, 'Refresh': this.tokens.refreshToken}
    })
    .then(async (response) => {
      // console.log('from refreshAcsToken');
      // console.log(response.data);
      this.tokens.accessToken = response.data.accessToken;
      console.log('token refreshed');
      // console.log(this.tokens.accessToken);
      lastConfig.headers.Authorization = this.tokens.accessToken;
      console.log(lastConfig.headers.Authorization);
      // return axios(lastConfig).then(response => {
      //   return response;
      // });
    });
    let newResponse = await axios(lastConfig);
    console.log('newResponse');
    console.log(newResponse);
    return newResponse;
    // return this.tokens.accessToken;
  }

  async fetchTodos () {
    console.log('fetchTodos called');
    let downloadedTodos = await this.downloadTodoProps();
    this.pageMetaData = downloadedTodos.metadata;
    // console.log('metadata', this.pageMetaData);
    let extractedTodos = this.extractTodos(downloadedTodos.data);
    // console.log('extractedTodos.length: ', extractedTodos.length);
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
    // this.tokens.accessToken = 'dummy value';
    axios.interceptors.response.use(async (response) => {
      // Do something with response data
      // console.log('from interceptor', response);
      if (response.data.acsTokenSuccess === false) {
        console.log('access token needs to be refreshed');
        let lastConfig = response.config;
        // return this.refreshAndRepeat(lastConfig);
        let returnValue = await this.refreshAcsToken(lastConfig);
        console.log('returnValue');
        console.log(returnValue);
        return returnValue;
      }
      // console.log('from interceptor', response);
      return response;
    }, (error) => {
      // Do something with response error
      return Promise.reject(error);
    });
    this.fetchTodos();
  }

  componentDidMount () {
    console.log('did mount called');
    this.firstFetch();
  }

  render () {
    // let todos = this.state.todos;
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
