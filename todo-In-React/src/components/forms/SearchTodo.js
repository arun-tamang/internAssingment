import React from 'react';

export const SearchTodoForm = (props) => {
  let keywords = '';
  let tags = '';
  let buttonStyle = {
    margin: '10px 10px 10px 0'
  };

  let handleClick = () => {
    // let processedTagIds = tags.replace(' ', '');
    // let searchInput = {
    //   keywords: keywords,
    //   tags: processedTagIds
    // };
    // props.handleChange(keywords, tags);
    props.handleSearchClick();
  };

  let handleKeyChange = (event) => {
    keywords = event.target.value;
    props.handleChange(keywords, 0);
  };

  let handleTagChange = (event) => {
    tags = event.target.value;
    props.handleChange(tags, 1);
  };

  return (
    <div>
      <input type='text' placeholder='keywords' onChange={handleKeyChange} />
      <input type='text' placeholder='tagNames' onChange={handleTagChange} />
      <button style={buttonStyle} onClick={handleClick}> Search </button>
    </div>
  );
};
