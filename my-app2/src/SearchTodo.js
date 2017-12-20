import React, { Component } from 'react';

export class SearchTodoForm extends Component {
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
    let searchInput = { keywords: this.refs.keyword.value,
      tags: this.refs.tag.value};
    this.props.handleSearchClick(searchInput);
  }

  render () {
    return (
      <div>
        <input type='text' placeholder='keywords' ref='keyword' />
        <input type='text' placeholder='tags' ref='tag' />
        <button style={this.buttonStyle} onClick={this.handleClick}> Search </button>
      </div>
    );
  }
}
