import React, { Component } from 'react';

export class SearchTodoForm extends Component {
  constructor () {
    super();
    this.buttonStyle = {
      margin: '10px 10px 10px 0'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
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
