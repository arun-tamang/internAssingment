import SERVICES from '../services/serviceContainer';

// add todo
export function addTodo(newTodo) {
  return {
    type: 'ADD_TODO',
    newTodo
  };
}

// remove todo
export function removeTodo(index) {
  return {
    type: 'REMOVE_TODO',
    index
  };
}

// edit todo
export function editTodo(title, index) {
  return {
    type: 'EDIT_TODO',
    title,
    index
  };
}

// search todo
export function searchTodo(keys, tags) {
  return {
    type: 'SEARCH_TODO',
    keys,
    tags
  };
}

// set todoProps
export function setTodoProps(todoProps) {
  return {
    type: 'SET_TODO_PROPS',
    todoProps
  };
}

// set metadata
export function setTodoMetaData(metadata) {
  return {
    type: 'SET_TODO_META_DATA',
    metadata
  };
}

// set search keywords
export function setSearchKeywords(keywords) {
  return {
    type: 'SET_SEARCH_KEYWORDS',
    keywords
  };
}

// set search tags
export function setSearchTags(newTag) {
  return {
    type: 'SET_SEARCH_TAGS',
    newTag
  };
}

// set todoToEdit
export function setTodoToEdit(todoId) {
  return {
    type: 'SET_TODO_TO_EDIT',
    todoId
  };
}

// fetch todos
export function fetchTodos(userId) {
  // console.log('from fetch action userId', userId);

  return (dispatch) => {
    return SERVICES.downloadTodos(userId).then((downloadedTodos) => {
      let extractedTodos = SERVICES.todoService.extractTodos(
        downloadedTodos.data
      );
      dispatch(setTodoProps(extractedTodos));
      dispatch(setTodoMetaData(downloadedTodos.metadata));
    },
    (err) => {
      console.log(err);
    });
  };
}

// add todos
// export function addTodos (title, tags) {
// }

// search todos
export function searchTodos(searchValue, userId) {
  return (dispatch) => {
    console.log('searchValue:', searchValue);
    return SERVICES.searchTodo(searchValue, userId).then(
      (response) => {
        console.log('search result');
        console.log(response.data.data);
        let extractedTodos = SERVICES.todoService.extractTodos(
          response.data.data
        );
        // this.currentNumTodos = extractedTodos.length;
        dispatch(setTodoProps(extractedTodos));
      },
      (err) => {
        console.log(err);
      }
    );
  };
}

export function setTags(tags) {
  return {
    type: 'SET_TAGS',
    tags
  };
}

export function fetchTags(userId) {
  return (dispatch) => {
    return SERVICES.fetchTags(userId).then((fetchedTags) => {
      // console.log('from fetchTags action');
      dispatch(setTags(fetchedTags.data));
      // dispatch(setTodoProps(extractedTodos));
      // dispatch(setTodoMetaData(downloadedTodos.metadata));
    },
    (err) => {
      console.log('err');
    });
  };
}

export function togglePopUp() {
  return {
    type: 'TOGGLE_POPUP'
  };
}

export function setPopUpEditTitle(title) {
  return {
    type: 'SET_POPUP_EDIT_TITLE',
    title
  };
}

export function toggleAddForm() {
  return {
    type: 'TOGGLE_ADD_FORM'
  };
}
