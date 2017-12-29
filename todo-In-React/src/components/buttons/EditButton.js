import React from 'react';

export const  EditButton = (props) => {

  let handleClick = () => {
    props.handleClick();
  }

  return (
    <button style={props.buttonStyle} onClick={handleClick}>
      {props.name}
    </button>
  );

}
