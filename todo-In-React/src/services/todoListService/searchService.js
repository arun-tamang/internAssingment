import myAxios from '../../myAxios';

export function searchTodo(searchInput, userId) {
  let myUrl = '/users/' + userId + '/todo/search';
  // console.log(searchInput);
  // console.log('searchInput');
  // console.log('searchInput.keywords');
  // console.log(searchInput.keywords);
  // console.log('searchInput.tags');
  // console.log(searchInput.tags);

  return myAxios
    .get(myUrl, {
      params: {
        keywords: searchInput.keywords,
        tags: searchInput.tags
      }
    })
    .then((response) => {
      console.log('search response: ', response.data.data);
      return response;
    })
    .catch((err) => console.log(err));
}
