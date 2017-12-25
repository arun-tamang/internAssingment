import React from 'react';

export const DeleteButton = (props) => {

  let name = 'Delete';

  return (
    <button style={props.buttonStyle} onClick={props.handleClick}>
      {name}
    </button>
  );
}