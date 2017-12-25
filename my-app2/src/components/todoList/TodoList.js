import React, { Component } from 'react';
import { Todo } from '../todoItem/Todo';
import { AddTodoForm } from '../forms/AddTodo';
import { SearchTodoForm } from '../forms/SearchTodo';
import { PopupEdit } from '../forms/PopUpEdit';
import myAxios from '../../myAxios';

import SERVICES from '../../services/serviceContainer';
import { getTodoIndex } from '../../services/todoListService/todoService';

class TodoList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showPopUp: false,
      title: 'Your Todos:',
      todoProps: [],
      popUpEditTitle: ''
    };
    this.todos = [];
    this.tokens = this.props.tokens;
    this.userDetails = this.props.userDetails;
    this.currentNumTodos = 4;
    this.fetchAfterDelete = false;
    this.fetchAfterAdd = true;
    this.pageSize = 5;
    this.pageMetaData = {};
    this.loggedIn = false;
    this.todoToEdit = -1;
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
    this.togglePopUp = this.togglePopUp.bind(this);
    this.closePopUp = this.closePopUp.bind(this);
    this.setPopUpEditTitle = this.setPopUpEditTitle.bind(this);
    // this.login = this.login.bind(this);
  }

  setTokenInHeader (tokens) {
    SERVICES.setTokenInHeader(tokens);
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
      todoProperties.unshift({
        id: newKey,
        title: title,
      });
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

  togglePopUp (title) {
    this.setState({
      showPopUp: !this.state.showPopUp,
      popUpEditTitle: title
    });
  }

  setPopUpEditTitle (title) {
    console.log('setPopUpEditTitle callsed');
    this.setState({
      popUpEditTitle: title
    });
  }

  handleEdit (title, id) {
    this.togglePopUp(title);
    this.todoToEdit = id;
  }

  closePopUp (title) {
    let id = this.todoToEdit;
    SERVICES.editTodo(title, id, this.userDetails.id)
    .then((response) => {
      let todoProperties = this.state.todoProps;
      let index = getTodoIndex(id, todoProperties);
      todoProperties[index].title = title;
      this.setState({
        todoProps: todoProperties
      });
    });
    this.togglePopUp(title);
  }

  getTodoIndex (id, todoProps) {
    return SERVICES.todoService.getTodoIndex(id, todoProps);
  }

  downloadTodos (userId) {
    return SERVICES.downloadTodos(userId);
  }

  extractTodos (toExtract) {
    return SERVICES.todoService.extractTodos(toExtract);
  }

  fetchTodos () {
    console.log('from fetchTodos', this.userDetails.id);
    this.downloadTodos(this.userDetails.id)
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
        this.setTokenInHeader(this.tokens);
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
    console.log('first fetch................');
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
        {this.state.showPopUp ? 
          <PopupEdit 
          title={this.state.popUpEditTitle}
          closePopUp={this.closePopUp}
          changeTitle={this.setPopUpEditTitle} />
          : null
        }
        <h2>{this.state.title}</h2>
        {this.state.todoProps
          .map(item => <Todo key={item.id} id={item.id} title={item.title}
            handleDelete={this.handleDelete} handleEdit={this.handleEdit} />)}
        <AddTodoForm handleAddClick={this.handleAdd} />
        <SearchTodoForm handleSearchClick={this.handleSearch} />
      </div>
    );
  }
}

export default TodoList;
