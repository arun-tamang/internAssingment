import React from 'react';
import Todo from '../todoItem/Todo';
import { AddTodoForm } from '../forms/AddTodo';
import { SearchTodoForm } from '../forms/SearchTodo';
import { PopupEdit } from '../forms/PopUpEdit';
import { Pagination } from '../pagination/Pagination';
import MyCalendar from '../calendar';

import SERVICES from '../../services/serviceContainer';
import { getTodoIndex } from '../../services/todoListService/todoService';

const TodoList = (props) => {
  const fetchTodos = () => {
    // console.log('from fetchTodos in Component', props.metadata);
    props.fetchTodos(props.userId, props.metadata.page).catch((err) => {
      console.log(err);
    });
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

  const handleAdd = () => {
    SERVICES.addTodo(props.userId, props.todoToAdd.title, props.todoToAdd.tagIds)
      .then((response) => {
        let { id } = response.data;
        if (decideFetch() === true) {
          fetchTodos();
        } else {
          props.addTodo({ id, title: props.todoToAdd.title, tags:props.todoToAdd.tagNames });
        }
        props.resetTodoToAdd();
      })
      .catch((err) => console.log(err));
  };

  const setPage = (page) => {
    if(page > 0 && page <= props.metadata.pageCount && page !== props.metadata.page) {
      props.fetchTodos(props.userId, page);
    }
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
      <div className="container">
        <div className="add-button-container">
          <button onClick={props.toggleAddForm} className="fa fa-plus" />
        </div>
        <div className="add-wrapper">
          <AddTodoForm
            height={props.addFormHeight}
            addTitle={props.todoToAdd.title}
            activeTagIds={props.todoToAdd.tagIds}
            availableTags={props.availableTags}
            expiryDate={props.todoToAdd.expiresAt}
            handleAddSubmit={handleAdd}
            setTitleToAdd={props.setTitleToAdd}
            setExpDateToAdd={props.setExpDateToAdd}
            setTagIdsToAdd={props.setTagIdsToAdd}
            setTagNamesToAdd={props.setTagNamesToAdd}
          />
        </div>
        <div className="pagination-container">
          {(Object.keys(props.metadata).length !== 0 &&
            props.metadata.constructor === Object) ? (
              <Pagination
                setPage={setPage}
                totalPages={props.metadata.pageCount}
                currentPage={props.metadata.page}
              />
            ) : (false)
          }
        </div>
        <MyCalendar todos={props.todoProps} />
        <div className="todos-container">
          <h2 className="todo-header">{props.title}</h2>
          <ul className="todo-list">
            {props.todoProps.map((item, i) => (
              <Todo
                key={item.id}
                id={item.id}
                index={i}
                title={item.title}
                tags={item.tags}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                moveTodo={props.moveTodo}
              />
            ))}
          </ul>
        </div>
        <div className="search-wrapper">
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
