import React, { Component } from 'react';
import {EditButton, DeleteButton} from './buttons.js';
// import './style.css';

export class Todo extends Component {
  constructor (props) {
    super(props);
    // without super() you get 'this is not allowed before super() error.'
    this.buttonStyle = {
      margin: '10px 10px 10px 0'
    };
    this.state = {
      title: this.props.title,
      inputValue: '',
      prghStyle: {width: 'auto', display: 'block'},
      inputStyle: {width: 'auto', display: 'none'}
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.displayPara = true;
    this.EditButnName = 'Edit';
    this.DeleteButnName = 'Delete';
  }
  // getInitialState () {
  //   return {
  //     title: 'my task to do'
  //   };
  // }

  handleEditClick () {
    this.displayPara = !(this.displayPara);
    // let paragraph = document.getElementsByClassName('todoP')[this.props.id];
    // let input = document.getElementsByClassName('todoInput')[this.props.id];
    if (this.displayPara === false) {
      // paragraph.style.display = 'none';
      let inputValue = this.state.title;
      // input.style.display = 'block';
      this.setState({
        inputValue: inputValue,
        prghStyle: {width: 'auto', display: 'none'},
        inputStyle: {width: 'auto', display: 'block'}
      });
    } else {
      // paragraph.style.display = 'block';
      // this.state.title = input.value;
      let newTitle = this.state.inputValue;
      // input.style.display = 'none';
      // this.render();  // Calling render doesn't work you need set
      this.setState({
        title: newTitle,
        prghStyle: {display: 'block'},
        inputStyle: {display: 'none'}
      });
      // this.setState({title: newTitle});
    }
    // console.log('handleEditClick called');
    // console.log(this.props.id);
  }

  handleInputChange (event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  handleDeleteClick () {
    // you need to remove todo from parent
    // console.log('handleDeleteClick called');
    console.log('deleting id is .........');
    console.log(this.props.id);
    this.props.handleDelete(this.props.id);
  }

  render () {
    return (
      <div>
        <p style={this.state.prghStyle}> {this.state.title} </p>
        <input style={this.state.inputStyle} ref='input'
          value={this.state.inputValue}
          onChange={this.handleInputChange} />
        <EditButton buttonStyle={this.buttonStyle}
          handleClick={this.handleEditClick}
          name={this.EditButnName} />
        <DeleteButton buttonStyle={this.buttonStyle}
          handleClick={this.handleDeleteClick}
          name={this.DeleteButnName} />
      </div>
    );
  }
}