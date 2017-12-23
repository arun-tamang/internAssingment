import React from 'react';
import { EditButton } from './buttons/EditButton.js';
import { DeleteButton } from './buttons/DeleteButton.js';
// import './style.css';

const Todo = (props, data, handlers) => {
  let buttonStyle = {
    margin: '10px 10px 10px 0'
  };
  let state = {
    title: data.title,
    inputValue: '',
    prghStyle: {width: 'auto', display: 'block'},
    inputStyle: {width: 'auto', display: 'none'}
  };
  let displayPara = true;
  let EditButnName = 'Edit';
  let DeleteButnName = 'Delete';

  let handleEditClick = () => {
    console.log(state.title);
    console.log(props);
    displayPara = !(displayPara);
    if (displayPara === false) {
      let inputValue = state.title;
      state.inputValue = inputValue;
      state.prghStyle = {width: 'auto', display: 'none'};
      state.inputStyle = {width: 'auto', display: 'block'};
      handlers.handleEdit();
    } else {
      let newTitle = state.inputValue;
      state.title = newTitle;
      state.prghStyle = {display: 'block'};
      state.inputStyle = {display: 'none'};
      handlers.handleEdit();
    }
  };

  let handleDeleteClick = () => {
    // props.handleDelete(props.id);
  };

  let handleInputChange = (e) => {
    state.title = e.target.value;
  };

  return (
    <div>
      <p style={state.prghStyle}> {state.title} </p>
      <input style={state.inputStyle} ref='input'
        value={state.inputValue}
        onChange={handleInputChange} />
      <EditButton buttonStyle={buttonStyle}
        handleClick={handleEditClick}
        name={EditButnName} />
      <DeleteButton buttonStyle={buttonStyle}
        handleClick={handleDeleteClick}
        name={DeleteButnName} />
    </div>
  );
};

export default Todo;
