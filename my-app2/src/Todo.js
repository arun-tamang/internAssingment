import React, { Component } from 'react';
import {EditButton, DeleteButton} from './buttons.js';
// import './style.css';

export class Todo extends Component {
  constructor (props) {
    super(props);
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

  handleEditClick () {
    this.displayPara = !(this.displayPara);
    if (this.displayPara === false) {
      let inputValue = this.state.title;
      this.setState({
        inputValue: inputValue,
        prghStyle: {width: 'auto', display: 'none'},
        inputStyle: {width: 'auto', display: 'block'}
      });
    } else {
      let newTitle = this.state.inputValue;
      this.setState({
        title: newTitle,
        prghStyle: {display: 'block'},
        inputStyle: {display: 'none'}
      });
      this.props.handleEdit(newTitle, this.props.id);
    }
  }

  handleInputChange (event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  handleDeleteClick () {
    // you need to remove todo from parent
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
