import React from 'react';
import { EditButton } from '../buttons/EditButton.js';
import { DeleteButton } from '../buttons/DeleteButton.js';

export const Todo = (props) => {
  let buttonStyle = {
    margin: '10px 10px 10px 0',
    padding: '5px 0'
  };

  let handleEditClick = () => {
    props.handleEdit(props.title, props.id);
  };

  let handleDeleteClick = () => {
    props.handleDelete(props.id);
  };

  return (
    <li className="todo">
      <EditButton buttonStyle={buttonStyle} handleClick={handleEditClick} />
      <DeleteButton buttonStyle={buttonStyle} handleClick={handleDeleteClick} />
      <span> {props.title} </span>
      <ul className="todo-tags-list">
        <i className="fa fa-tags" />
        {props.tags.map((tagItem, index) => <li key={index}><a>{tagItem}</a></li>)}
      </ul>
    </li>
  );
};
