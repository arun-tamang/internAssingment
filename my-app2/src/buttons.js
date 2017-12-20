import React, { Component } from 'react';

export class EditButton extends Component {
  constructor () {
    super();
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

export class DeleteButton extends Component {
  constructor () {
    super();
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

export class AddButton extends Component {
  constructor () {
    super();
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
