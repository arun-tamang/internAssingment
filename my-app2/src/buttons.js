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
      // this.state.name = 'Done';
      this.setState({name: 'Done'});
    } else {
      // this.state.name = 'Edit';
      // above was not able to change name of button because setState or render of
      // its parent was not called on which it relied so its a good practice to
      // use setState.
      this.setState({name: 'Edit'});
    }
  }

  handleClick () {
    this.toggleName();
    this.props.handleClick();
  }

  render () {
    // console.log('render of EditButton called');
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

  // handleClick () {
  //   this.props.handleClick();
  // }

  render () {
    return (
      <button style={this.props.buttonStyle} onClick={this.props.handleClick}>
        {this.state.name}
      </button>
    );
  }
}
