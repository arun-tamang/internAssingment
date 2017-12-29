import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/todoActionCreators';
import TodoList from '../components/todoList/TodoList';

function mapStateToProps (state) {
  return {
    ...state.todoList,
    userId: state.user.userDetails.id
  };
}

function mapDispachToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const TodoListContainer = connect(mapStateToProps, mapDispachToProps)(TodoList);

export default TodoListContainer;
