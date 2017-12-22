import React, { Component } from 'react';

export class AddButton extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: 'Add'
    };
  }

  render () {
    return (
      <button style={this.props.buttonStyle} onClick={this.props.handleClick}>
        {this.state.name}
      </button>
    );
  }
}
