import React from 'react';
import { EditButton } from '../buttons/EditButton.js';
import { DeleteButton } from '../buttons/DeleteButton.js';
// import './style.css';

export const Todo = (props) => {

  let buttonStyle = {
    margin: '10px 10px 10px 0'
  };
  let editBtnName = 'Edit';

  let handleEditClick = () => {
    props.handleEdit(props.title, props.id);
  }

  let handleDeleteClick = () => {
    props.handleDelete(props.id);
  }

  return (
    <div>
      <p> {props.title} </p>
      <EditButton buttonStyle={buttonStyle}
        handleClick={handleEditClick}
        name={editBtnName} />
      <DeleteButton buttonStyle={buttonStyle}
        handleClick={handleDeleteClick} />
    </div>
  );

}
