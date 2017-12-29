import React, { Component } from 'react';
import { Todo } from '../todoItem/Todo';
import { AddTodoForm } from '../forms/AddTodo';
import { SearchTodoForm } from '../forms/SearchTodo';
import { PopupEdit } from '../forms/PopUpEdit';

import SERVICES from '../../services/serviceContainer';
import { getTodoIndex } from '../../services/todoListService/todoService';

class TodoList extends Component {
  constructor (props) {
    super(props);
    // binding functions
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.getTodoIndex = this.getTodoIndex.bind(this);
    this.fetchTodos = this.fetchTodos.bind(this);
    this.togglePopUp = this.togglePopUp.bind(this);
    this.closePopUp = this.closePopUp.bind(this);
    this.setSearchValues = this.setSearchValues.bind(this);
  }

  fetchTodos () {
    this.props.fetchTodos(this.props.userId);
  }

  componentDidMount () {
    this.fetchTodos();
  }

  setSearchValues (newValue, index) {
    if (index === 0) {
      this.props.setSearchKeywords(newValue);
    } else if (index === 1) {
      this.props.setSearchTags(newValue);
    }
  }

  getTodoIndex (id, todoProps) {
    return SERVICES.todoService.getTodoIndex(id, todoProps);
  }

  decideFetch () {
    if (this.props.todoProps.length === this.props.metadata.pageSize) {
      return true;
    }
    return false;
  }

  handleDelete (todoId) {
    SERVICES.deleteTodo(this.props.userId, todoId)
      .then((response) => {
        let index = this.getTodoIndex(todoId, this.props.todoProps);
        if (this.decideFetch() === true) {
          this.fetchTodos();
        } else {
          this.props.removeTodo(index);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSearch () {
    this.props.searchTodos(this.props.searchValue, this.props.userId);
  }

  togglePopUp (title) {
    this.props.togglePopUp();
    this.props.setPopUpEditTitle(title);
  }

  handleEdit (title, id) {
    this.togglePopUp(title);
    this.props.todoToEdit = id;
  }

  closePopUp (title) {
    let id = this.props.todoToEdit;
    SERVICES.editTodo(title, id, this.props.userId)
      .then((response) => {
        let index = getTodoIndex(id, this.props.todoProps);
        this.props.editTodo(title, index);
      });
    this.togglePopUp(title);
  }

  handleAdd (title, tags) {
    SERVICES.addTodo(this.props.userId, title, tags)
      .then((response) => {
        let { id } = response.data;
        if (this.decideFetch() === true) {
          this.fetchTodos();
        } else {
          this.props.addTodo({ id, title });
        }
      })
      .catch(err => console.log(err));
  }

  render () {
    return (
      <div>
        {this.props.showPopUp ?
          <PopupEdit
            title={this.props.popUpEditTitle}
            closePopUp={this.closePopUp}
            changeTitle={this.props.setPopUpEditTitle} />
            : null
        }
        <h2>{this.props.title}</h2>
        {this.props.todoProps
          .map(item => <Todo key={item.id} id={item.id} title={item.title}
            handleDelete={this.handleDelete} handleEdit={this.handleEdit} />)}
        <AddTodoForm handleAddClick={this.handleAdd} />
        <SearchTodoForm handleSearchClick={this.handleSearch} handleChange={this.setSearchValues} />
      </div>
    );
  }
}

export default TodoList;
