import React, { Component } from 'react';
import { Todo } from '../todoItem/Todo';
import { AddTodoForm } from '../forms/AddTodo';
import { SearchTodoForm } from '../forms/SearchTodo';
import myAxios from '../../myAxios';

import SERVICES from '../../services/serviceContainer';

class TodoList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: 'Your Todos:',
      todoProps: []
    };
    this.todos = [];
    // this.userInfo = {'email': 'johnny@bravo.com', 'password': 'password2'};
    // this.userInfo = {'email': 'jane12@mail.com', 'password': 'password1'};
    this.tokens = this.props.tokens;
    this.userDetails = this.props.userDetails;
    this.currentNumTodos = 4;
    this.fetchAfterDelete = false;
    this.fetchAfterAdd = true;
    this.pageSize = 5;
    this.pageMetaData = {};
    this.loggedIn = false;

    // binding functions
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.getTodoIndex = this.getTodoIndex.bind(this);
    // this.downloadTodos = this.downloadTodos.bind(this);
    this.extractTodos = this.extractTodos.bind(this);
    this.firstFetch = this.firstFetch.bind(this);
    this.fetchTodos = this.fetchTodos.bind(this);
    this.refreshAcsToken = this.refreshAcsToken.bind(this);
    // this.login = this.login.bind(this);
  }

  setTokenInHeader (tokens) {
    myAxios.defaults.headers = {'Authorization': tokens.accessToken, 'Refresh': tokens.refreshToken};
  }

  componentWillMount () {
    console.log('will mount called');
  }

  handleAdd (title, tags) {
    SERVICES.addTodo(this.userDetails.id, title, tags)
    .then((response) => {
      let todoProperties = [...this.state.todoProps];
      this.decideFetch(todoProperties);
      let newKey = response.data.id;
      todoProperties.unshift({key: newKey, title: title});
      this.currentNumTodos++;
      if (this.fetchAfterAdd === true) {
        this.fetchTodos();
      } else {
        this.setState({todoProps: todoProperties});
      }
    });
  }

  // handleDelete (todoId) {
  //   SERVICES.deleteTodo.call(this, todoId);
  // }

  decideFetch (todoProperties) {
    if (todoProperties.length === this.pageSize) {
      // this works for both adding and deleting a todo.
      this.fetchAfterDelete = true;
      this.fetchAfterAdd = true;
    } else {
      this.fetchAfterDelete = false;
      this.fetchAfterAdd = false;
    }
  }

  handleDelete (todoId) {
    SERVICES.deleteTodo(this.userDetails.id, todoId)
    .then((response) => {
      let todoProperties = this.state.todoProps.slice();
      let index = this.getTodoIndex(todoId, todoProperties);
      if (!(index === -2)) {
        this.decideFetch(todoProperties);
        todoProperties.splice(index, 1);
        this.currentNumTodos--;
      }
      if (this.fetchAfterDelete === true) {
        this.fetchTodos();
      } else {
        this.setState({todoProps: todoProperties});
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleSearch (searchInput) {
    SERVICES.searchTodo(searchInput, this.userDetails.id)
    .then((response) => {
      let extractedTodos = this.extractTodos(response.data.data);
      this.currentNumTodos = extractedTodos.length;
      this.setState({
        todoProps: extractedTodos
      });
    });
  }

  handleEdit (newName, id) {
    SERVICES.editTodo(newName, id, this.userDetails.id);
  }

  getTodoIndex (id, todoProps) {
    return SERVICES.todoService.getTodoIndex(id, todoProps);
  }

  downloadTodos (userId, tokens) {
    return SERVICES.downloadTodos(userId, tokens);
  }

  extractTodos (toExtract) {
    return SERVICES.todoService.extractTodos(toExtract);
  }

  fetchTodos () {
    console.log('from fetchTodos', this.userDetails.id, this.tokens);
    this.downloadTodos(this.userDetails.id, this.tokens)
    .then((downloadedTodos) => {
      this.pageMetaData = downloadedTodos.metadata;
      let extractedTodos = this.extractTodos(downloadedTodos.data);
      this.currentNumTodos = extractedTodos.length;
      this.setState({
        todoProps: extractedTodos
      });
    });
  }

  refreshAcsToken () {
    return SERVICES.refreshAcsToken();
  }

  // login (userInfo) {
  //   return SERVICES.login(userInfo)
  //   .then((response) => {
  //     this.tokens = response.data.tokens;
  //     this.userDetails = response.data.userInfo;
  //     this.setTokenInHeader(this.tokens);
  //     this.loggedIn = true;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }

  repeatPrevRequest (lastConfig) {
    return myAxios(lastConfig)
      .then(response => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  refreshAndRepeat (lastConfig) {
    return this.refreshAcsToken()
      .then((response) => {
        this.tokens.accessToken = response.data.accessToken;
        console.log('token refreshed');
        lastConfig.headers.Authorization = this.tokens.accessToken;
        return this.repeatPrevRequest(lastConfig);
      });
  }

  addInterceptor () {
    console.log('now activating interceptor');
    myAxios.interceptors.response.use((response) => {
      if (response.data.acsTokenSuccess === false) {
        console.log('access token needs to be refreshed');
        let lastConfig = response.config;
        return this.refreshAndRepeat(lastConfig);
      }
      return response;
    }, (error) => {
      return Promise.reject(error);
    });
  }

  firstFetch () {
    // this.login(this.userInfo)
    // .then(() => {
    //   this.addInterceptor();
    //   this.fetchTodos();
    // });
    console.log('first fetch................');
    console.log(this.props);
    console.log(this.tokens);
    this.addInterceptor();
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
            handleDelete={this.handleDelete} handleEdit={this.handleEdit} />)}
        <AddTodoForm handleAddClick={this.handleAdd} />
        <SearchTodoForm handleSearchClick={this.handleSearch} />
      </div>
    );
  }
}

export default TodoList;
