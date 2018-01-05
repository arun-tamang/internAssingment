import React from 'react';
// import { AddButton } from '../buttons/AddButton';
import { AddTagField } from '../fields/AddFormTagField';
// import '../../styles/addForm.css';

export const AddTodoForm = (props) => {
  let newTitle = '';
  let newTags = new Set();

  let handleClick = () => {
    let tagString = [...newTags].join(',');
    props.handleAddClick(newTitle, tagString);
  };

  let handleTitleChange = (event) => {
    newTitle = event.target.value;
  };

  // let handleTagChange = (event) => {
  //   newTags = event.target.value;
  // };

  const handleAddTagClick = (id) => {
    // props.handleChange(name, 1);
    // console.log('tag clicked', id);
    if (newTags.has(id)) {
      newTags.delete(id);
    } else {
      newTags.add(id);
    }
    // console.log(newTags);
    // console.log([...newTags].join(','));
  };

  let opacity = props.height === 0 ? 0 : 1;
  let tagFieldHeight = props.height === 0 ? 0 : 10;

  return (
    <form
      className="form-inline height-transition"
      style={{ margin: '0 auto' }}
    >
      <input
        className="height-transition add-form-input"
        type="text"
        placeholder="add todo title here..."
        onChange={handleTitleChange}
        style={{ height: props.height, opacity }}
      />
      {/* <input
        className="height-transition add-form-input"
        type="text"
        placeholder="add tagIds(eg: 1, 2,.., 8)"
        onChange={handleTagChange}
        style={{ height: props.height, opacity }}
      /> */}
      <AddTagField
        tagArray={[...props.availableTags]}
        handleClick={handleAddTagClick}
        style={{ height: tagFieldHeight, opacity }}
      />
      <button
        type="button"
        className="btn btn-primary height-transition"
        onClick={handleClick}
        style={{ height: props.height, opacity }}
      >
        Add
      </button>
    </form>
  );
};
