import React, { Component } from 'react';

export class EditButton extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: 'Edit'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  toggleName () {
    if (this.state.name === 'Edit') {
      this.setState({name: 'Done'});
    } else {
      this.setState({name: 'Edit'});
    }
  }

  handleClick () {
    this.toggleName();
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
