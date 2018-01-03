import React from 'react';

const TagItem = (props) => {
  return (
    <li>
      <input
        type="checkbox"
        onClick={() => props.handleClick(props.name)}
        id={props.name}
        value={props.name}
      />
      <label htmlFor={props.name}>{props.name}</label>
    </li>
  );
};

export const TagField = (props) => {
  // console.log(props.tagArray);
  const handleClick = (name) => {
    props.handleCheckBoxClick(name);
  };
  return (
    <fieldset>
      <legend>Tags</legend>
      <ul className="tag-list">
        {props.tagArray.map((tagItem) => (
          <TagItem
            key={tagItem.id}
            handleClick={handleClick}
            name={tagItem.name}
            id={tagItem.id}
          />
        ))}
      </ul>
    </fieldset>
  );
};
