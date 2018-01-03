import React from 'react';
// import { AddButton } from '../buttons/AddButton';

export const AddTodoForm = (props) => {
  let newTitle = '';
  let newTags = '';

  let handleClick = () => {
    props.handleAddClick(newTitle, newTags);
  };

  let handleTitleChange = (event) => {
    newTitle = event.target.value;
  };

  let handleTagChange = (event) => {
    newTags = event.target.value;
  };

  let opacity = (props.height === 0) ? 0 : 1;

  return (
    <form className='form-inline height-transition' style={{ margin: '0 auto'}}>
      <input
        className='height-transition add-form-input'
        type='text'
        placeholder='add todo title here...'
        onChange={handleTitleChange}
        style={{height: props.height, opacity}}
      />
      <input
        className='height-transition add-form-input'
        type='text'
        placeholder='add tagIds(eg: 1, 2,.., 8)'
        onChange={handleTagChange}
        style={{height: props.height, opacity}}
      />
      <button
        type='button'
        className='btn btn-primary height-transition'
        onClick={handleClick}
        style={{height: props.height, opacity}}
      >
        Add
      </button>
    </form>
  );
};
