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
  let stateCopy = { ...state };
  let tagCopy = [...state.tags]
  let index = tagCopy.indexOf(action.newTag);
  if( index === -1) {
    // stateCopy.tags.push(action.newTag);
    tagCopy.push(action.newTag);
  } else {
    // stateCopy.tags.splice(index,1);
    tagCopy.splice(index, 1);
  }
  stateCopy.tags = tagCopy;
  // console.log('stateCopy', stateCopy);
  // console.log('state', state);
  return stateCopy;
};

const toggleHeight = (state) => {
  if (state === 0) {
    return 60;
  }
  return 0;
}

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
    case 'SET_TAGS':
      return {
        ...state, availableTags: action.tags
      };
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
    case 'SET_TODO_TO_EDIT':
      return {
        ...state,
        todoToEdit: action.todoId
      };
    case 'TOGGLE_POPUP':
      return {
        ...state,
        showPopUp: !(state.showPopUp)
      };
    case 'TOGGLE_ADD_FORM':
      return {
        ...state,
        addFormHeight: toggleHeight(state.addFormHeight)
      }
    case 'SET_POPUP_EDIT_TITLE':
      return {
        ...state,
        popUpEditTitle: action.title
      }
    case 'RESET_STORE':
      console.log('reset store from todoList reducer');
      return action.defaultState.todoList;
    default:
      return state;
  }
};

export default todoList;
