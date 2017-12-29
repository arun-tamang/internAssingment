const setTodoProps = (state, action) => {
  return {
    ...state,
    todoProps: action.todoProps
  };
};

const setTodoMetaData = (state, action) => {
  return {
    ...state,
    metadata: action.metadata
  };
}

const editTodo = (state, action) => {
  let newState = [...state];
  newState[action.index].title = action.title;
  return newState;
};

const setSearchKeywords = (state, action) => {
  return {
    ...state,
    keywords: action.keywords
  };
};

const setSearchTags = (state, action) => {
  return {
    ...state,
    tags: action.tags
  };
};

const todoList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state, todoProps: [action.newTodo, ...state.todoProps]
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todoProps: [...state.todoProps.slice(0, action.index),
          ...state.todoProps.slice(action.index + 1)]
      };
    case 'EDIT_TODO':
      return {
        ...state,
        todoProps: editTodo(state.todoProps, action)
      };
    case 'SET_TODO_PROPS':
      return setTodoProps(state, action);
    case 'SET_TODO_META_DATA':
      return setTodoMetaData(state, action);
    case 'SET_SEARCH_KEYWORDS':
      return {
        ...state,
        searchValue: setSearchKeywords(state.searchValue, action)
      };
    case 'SET_SEARCH_TAGS':
      return {
        ...state,
        searchValue: setSearchTags(state.searchValue, action)
      };
    case 'TOGGLE_POPUP':
      return {
        ...state,
        showPopUp: !(state.showPopUp)
      };
    case 'SET_POPUP_EDIT_TITLE':
      return {
        ...state,
        popUpEditTitle: action.title
      }
    default:
      return state;
  }
};

export default todoList;
