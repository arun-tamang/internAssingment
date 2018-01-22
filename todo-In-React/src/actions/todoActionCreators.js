import SERVICES from '../services/serviceContainer';

// add todo
export function addTodo(newTodo) {
  return {
    type: 'ADD_TODO',
    payload: {
      newTodo
    }
  };
}

// remove todo
export function removeTodo(index) {
  return {
    type: 'REMOVE_TODO',
    payload: {
      index
    }
  };
}

// edit todo
export function editTodo(title, index) {
  return {
    type: 'EDIT_TODO',
    payload: {
      title,
      index
    }
  };
}

// search todo
export function searchTodo(keys, tags) {
  return {
    type: 'SEARCH_TODO',
    payload: {
      keys,
      tags
    }
  };
}

// set todoProps
export function setTodoProps(todoProps) {
  return {
    type: 'SET_TODO_PROPS',
    payload: {
      todoProps
    }
  };
}

// set metadata
export function setTodoMetaData(metadata) {
  return {
    type: 'SET_TODO_META_DATA',
    payload: {
      metadata
    }
  };
}

// set search keywords
export function setSearchKeywords(keywords) {
  return {
    type: 'SET_SEARCH_KEYWORDS',
    payload: {
      keywords
    }
  };
}

// set search tags
export function setSearchTags(newTag) {
  return {
    type: 'SET_SEARCH_TAGS',
    payload: {
      newTag
    }
  };
}

// set todoToEdit
export function setTodoToEdit(todoId) {
  return {
    type: 'SET_TODO_TO_EDIT',
    payload: {
      todoId
    }
  };
}

export function moveTodo(dragIndex, hoverIndex) {
  return {
    type: 'MOVE_TODO',
    payload: {
      dragIndex,
      hoverIndex
    }
  };
}

// fetch todos
export function fetchTodos(userId, pageNo) {
  // console.log('from fetch action userId', userId);

  return (dispatch) => {
    return SERVICES.downloadTodos(userId, pageNo).then(
      (downloadedTodos) => {
        if (downloadedTodos) {
          let extractedTodos = SERVICES.todoService.extractTodos(
            downloadedTodos.data
          );
          dispatch(setTodoProps(extractedTodos));
          dispatch(setTodoMetaData(downloadedTodos.metadata));
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
}

// add todos
// export function addTodos (title, tags) {
// }

// search todos
export function searchTodos(searchValue, userId) {
  return dispatch => {
    return SERVICES.searchTodo(searchValue, userId).then(response => {
      if (response) {
        let extractedTodos = SERVICES.todoService.extractTodos(
          response.data.data
        );
        // this.currentNumTodos = extractedTodos.length;
        dispatch(setTodoProps(extractedTodos));
      }
    });
  };
}

export function setTags(tags) {
  return {
    type: 'SET_TAGS',
    payload: {
      tags
    }
  };
}

export function fetchTags(userId) {
  return (dispatch) => {
    return SERVICES.fetchTags(userId).then(
      (fetchedTags) => {
        // console.log('from fetchTags action');
        if (fetchedTags) {
          dispatch(setTags(fetchedTags.data));
        }
        // dispatch(setTodoProps(extractedTodos));
        // dispatch(setTodoMetaData(downloadedTodos.metadata));
      },
      (err) => {
        console.log(err);
      }
    );
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
    payload: {
      title
    }
  };
}

export function toggleAddForm() {
  return {
    type: 'TOGGLE_ADD_FORM'
  };
}

export function setTitleToAdd(title) {
  return {
    type: 'SET_TITLE_TO_ADD',
    payload: {
      title
    }
  };
}

export function setExpDateToAdd(date) {
  return {
    type: 'SET_EXP_DATE_TO_ADD',
    payload: {
      date
    }
  };
}

export function setTagIdsToAdd(id) {
  return {
    type: 'SET_TAG_IDS_TO_ADD',
    payload: {
      id
    }
  };
}

export function setTagNamesToAdd(name) {
  return {
    type: 'SET_TAG_NAMES_TO_ADD',
    payload: {
      name
    }
  };
}

export function resetTodoToAdd() {
  return {
    type: 'RESET_TODO_TO_ADD'
  };
}
