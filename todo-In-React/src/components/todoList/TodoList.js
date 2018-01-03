import React from 'react';
import { Todo } from '../todoItem/Todo';
import { AddTodoForm } from '../forms/AddTodo';
import { SearchTodoForm } from '../forms/SearchTodo';
import { PopupEdit } from '../forms/PopUpEdit';

import SERVICES from '../../services/serviceContainer';
import { getTodoIndex } from '../../services/todoListService/todoService';

const TodoList = (props) => {
  const fetchTodos = () => {
    props.fetchTodos(props.userId)
      .catch((err) => {
        console.log(err);
      });;
  };

  const setSearchValues = (newValue, index) => {
    if (index === 0) {
      props.setSearchKeywords(newValue);
    } else if (index === 1) {
      props.setSearchTags(newValue);
    }
  };

  const decideFetch = () => {
    if (props.todoProps.length === props.metadata.pageSize) {
      return true;
    }
    return false;
  };

  const handleDelete = (todoId) => {
    SERVICES.deleteTodo(props.userId, todoId)
      .then((response) => {
        let index = getTodoIndex(todoId, props.todoProps);
        if (decideFetch() === true) {
          fetchTodos();
        } else {
          props.removeTodo(index);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = () => {
    props.searchTodos(props.searchValue, props.userId);
  };

  const togglePopUp = (title) => {
    props.togglePopUp();
    props.setPopUpEditTitle(title);
  };

  const handleEdit = (title, id) => {
    togglePopUp(title);
    props.setTodoToEdit(id);
  };

  const closePopUp = (title) => {
    let id = props.todoToEdit;
    SERVICES.editTodo(title, id, props.userId).then((response) => {
      let index = getTodoIndex(id, props.todoProps);
      props.editTodo(title, index);
    });
    togglePopUp(title);
  };

  const handleAdd = (title, tags) => {
    SERVICES.addTodo(props.userId, title, tags)
      .then((response) => {
        let { id } = response.data;
        if (decideFetch() === true) {
          fetchTodos();
        } else {
          props.addTodo({ id, title });
        }
      })
      .catch((err) => console.log(err));
  };

  const toggleAddFrom = () => {
    props.toggleAddForm();
  };

  return (
    <div>
      {props.showPopUp ? (
        <PopupEdit
          title={props.popUpEditTitle}
          closePopUp={closePopUp}
          changeTitle={props.setPopUpEditTitle}
        />
      ) : null}
      <div className='container'>
        <div className='add-button-container'>
          <button onClick={toggleAddFrom} className='fa fa-plus' />
        </div>
        <div className='add-wrapper'>
          <AddTodoForm
            height={props.addFormHeight}
            handleAddClick={handleAdd}
          />
        </div>
        <div className='todos-container'>
          <h2 className='todo-header'>{props.title}</h2>
          <ul className='todo-list'>
            {props.todoProps.map((item) => (
              <Todo
                key={item.id}
                id={item.id}
                title={item.title}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </ul>
        </div>
        <div className='search-wrapper'>
          <SearchTodoForm
            handleSearchClick={handleSearch}
            handleChange={setSearchValues}
            availableTags={props.availableTags}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoList;
