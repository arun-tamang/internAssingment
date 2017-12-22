import React, { Component } from 'react';
import {AddButton} from '../buttons/AddButton';

export class AddTodoForm extends Component {
  constructor (props) {
    super(props);
    this.buttonStyle = {
      margin: '10px 10px 10px 0'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.props.handleAddClick(this.refs.todoInput.value, this.refs.tagInput.value);
  }

  render () {
    return (
      <div>
        <input type='text' placeholder='add todo title here...' ref='todoInput' />
        <input type='text' placeholder='add tagIds (eg: 1, 2,..., 8)' ref='tagInput' />
        <AddButton buttonStyle={this.buttonStyle} handleClick={this.handleClick} />
      </div>
    );
  }
}
