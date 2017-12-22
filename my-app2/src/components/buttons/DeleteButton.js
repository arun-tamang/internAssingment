import React, { Component } from 'react';

export class DeleteButton extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: 'Delete'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.props.handleClick();
  }

  render () {
    return (
      <button style={this.props.buttonStyle} onClick={this.handleClick}>
        {this.state.name}
      </button>
    );
  }
}
