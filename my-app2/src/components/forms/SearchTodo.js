import React, { Component } from 'react';

export class SearchTodoForm extends Component {
  constructor (props) {
    super(props);
    this.buttonStyle = {
      margin: '10px 10px 10px 0'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    let processedTagIds = this.refs.tag.value.replace(' ', '');
    // console.log(processedTagIds);
    let searchInput = { keywords: this.refs.keyword.value,
      tags: processedTagIds};
    this.props.handleSearchClick(searchInput);
  }

  render () {
    return (
      <div>
        <input type='text' placeholder='keywords' ref='keyword' />
        <input type='text' placeholder='tagNames' ref='tag' />
        <button style={this.buttonStyle} onClick={this.handleClick}> Search </button>
      </div>
    );
  }
}
