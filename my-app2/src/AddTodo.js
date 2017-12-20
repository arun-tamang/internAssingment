import React, { Component } from 'react';
import {AddButton} from './buttons';

export class AddTodoForm extends Component {
  constructor () {
    super();
    // without super() you get 'this is not allowed before super() error.'
    this.buttonStyle = {
      margin: '10px 10px 10px 0'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    // console.log(this.refs.input.value);
    this.props.handleAddClick(this.refs.input.value);
  }

  render () {
    return (
      <div>
        <input type='text' placeholder='add here...' ref='input' />
        <AddButton buttonStyle={this.buttonStyle} handleClick={this.handleClick} />
      </div>
    );
  }
}
