import React from 'react';
import '../../styles/popUpEdit.css';


export const PopupEdit = (props) => {

  let handleInputChange = (event) => {
    props.changeTitle(event.target.value);
  }

  let closePopUp = () => {
    props.closePopUp(props.title);
  }

  return (
    <div className='popup'>
      <div className='popup_inner'>
        <h3>Edit Todo Here</h3>
        <input type='text' onChange={handleInputChange} value={props.title} />
        <button onClick={closePopUp}> Done</button>
      </div>
    </div>
  ); 
}

