import React from 'react';
import {AddButton} from '../buttons/AddButton';

export const AddTodoForm = (props) => {
  let newTitle = '';
  let newTags = '';

  let buttonStyle = {
    margin: '10px 10px 10px 0'
  };

  let handleClick = () => {
    props.handleAddClick(newTitle, newTags);
  };

  let handleTitleChange = (event) => {
    newTitle = event.target.value;
  };
  
  let handleTagChange = (event) => {
    newTags = event.target.value;
  };

  return (
    <div>
      <input type='text' placeholder='add todo title here...' onChange={handleTitleChange} />
      <input type='text' placeholder='add tagIds(eg: 1, 2,.., 8)' onChange={handleTagChange} />
      <AddButton buttonStyle={buttonStyle} handleClick={handleClick} />
    </div>
  );

}
