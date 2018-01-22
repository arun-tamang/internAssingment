import moment from 'moment';

const setTodoProps = (state, action) => {
  return {
    ...state,
    todoProps: action.payload.todoProps
  };
};

const setTodoMetaData = (state, action) => {
  return {
    ...state,
    metadata: action.payload.metadata
  };
};

const editTodo = (state, action) => {
  let newState = [...state];
  newState[action.payload.index].title = action.payload.title;
  return newState;
};

const setSearchKeywords = (state, action) => {
  return {
    ...state,
    keywords: action.payload.keywords
  };
};

const setSearchTags = (state, action) => {
  let stateCopy = { ...state };
  let tagCopy = [...state.tags];
  let index = tagCopy.indexOf(action.payload.newTag);
  if (index === -1) {
    // stateCopy.tags.push(action.payload.newTag);
    tagCopy.push(action.payload.newTag);
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
};

const setTitleToAdd = (todoToAdd, action) => {
  todoToAdd.title = action.payload.title;
  return todoToAdd;
};

const setExpDateToAdd = (todoToAdd, action) => {
  todoToAdd.expiresAt = action.payload.date;
  return todoToAdd;
};

const setTagIdsToAdd = (todoToAdd, action) => {
  let tagIdsCopy = [...todoToAdd.tagIds];
  let index = tagIdsCopy.indexOf(action.payload.id);
  if (index === -1) {
    tagIdsCopy.push(action.payload.id);
  } else {
    tagIdsCopy.splice(index, 1);
  }
  todoToAdd.tagIds = tagIdsCopy;

  return todoToAdd;
};

const setTagNamesToAdd = (todoToAdd, action) => {
  let tagNamesCopy = [...todoToAdd.tagNames];
  let index = tagNamesCopy.indexOf(action.payload.name);
  if (index === -1) {
    tagNamesCopy.push(action.payload.name);
  } else {
    tagNamesCopy.splice(index, 1);
  }
  todoToAdd.tagNames = tagNamesCopy;

  return todoToAdd;
};

const resetTodoToAdd = (todoToAdd) => {
  todoToAdd.title = '';
  todoToAdd.tagIds = [];
  todoToAdd.tagNames = [];
  todoToAdd.expiresAt = moment();

  return todoToAdd;
}

const moveTodo = (state, action) => {
  let todos = [...state];
  let dragTodo = todos[action.payload.dragIndex];
  // need to swap
  todos.splice(action.payload.dragIndex, 1);
  todos.splice(action.payload.hoverIndex, 0, dragTodo);
  return todos;
};

const todoList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todoProps: [action.payload.newTodo, ...state.todoProps]
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todoProps: [
          ...state.todoProps.slice(0, action.payload.index),
          ...state.todoProps.slice(action.payload.index + 1)
        ]
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
        ...state,
        availableTags: action.payload.tags
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
        todoToEdit: action.payload.todoId
      };
    case 'TOGGLE_POPUP':
      return {
        ...state,
        showPopUp: !state.showPopUp
      };
    case 'SET_POPUP_EDIT_TITLE':
      return {
        ...state,
        popUpEditTitle: action.payload.title
      };
    case 'TOGGLE_ADD_FORM':
      return {
        ...state,
        addFormHeight: toggleHeight(state.addFormHeight)
      };
    case 'SET_TITLE_TO_ADD':
      return {
        ...state,
        todoToAdd: setTitleToAdd({...state.todoToAdd}, action)
      };
    case 'SET_EXP_DATE_TO_ADD':
      return {
        ...state,
        todoToAdd: setExpDateToAdd({...state.todoToAdd}, action)
      };
    case 'SET_TAG_IDS_TO_ADD':
      return {
        ...state,
        todoToAdd: setTagIdsToAdd({...state.todoToAdd}, action)
      };
    case 'SET_TAG_NAMES_TO_ADD':
      return {
        ...state,
        todoToAdd: setTagNamesToAdd({...state.todoToAdd}, action)
      };
    case 'RESET_TODO_TO_ADD':
      return {
        ...state,
        todoToAdd: resetTodoToAdd({...state.todoToAdd})
      }
    case 'RESET_STORE':
      console.log('reset store from todoList reducer');
      return action.payload.defaultState.todoList;
    case 'MOVE_TODO':
      return {
        ...state,
        todoProps: moveTodo(state.todoProps, action)
      };
    default:
      return state;
  }
};

export default todoList;
