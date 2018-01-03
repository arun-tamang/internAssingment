import React from 'react';
import { TagField } from '../fields/TagField';

export const SearchTodoForm = (props) => {
  let handleClick = () => {
    props.handleSearchClick();
  };

  let handleKeyChange = (event) => {
    props.handleChange(event.target.value, 0);
  };

  // let handleTagChange = (event) => {
  //   props.handleChange(event.target.value, 1);
  // };

  const handleTagClick = (name) => {
    props.handleChange(name, 1);
  }

  return (
    <form style={{ margin: '0 auto' }}>
      <input
        className='search-input'
        type='text'
        placeholder='keywords'
        onChange={handleKeyChange}
      />
      {/* <input
      className='form-control'
      type='text'
      placeholder='tagNames'
      onChange={handleTagChange}
    /> */}
      <TagField tagArray={props.availableTags} handleCheckBoxClick={handleTagClick}/>
      <button type='button' className='btn btn-primary' onClick={handleClick}>
        Search
      </button>
    </form>
  );
};
