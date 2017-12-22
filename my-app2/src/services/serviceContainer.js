import { addTodo } from './todoListService/adderService';
import { editTodo } from './todoListService/editService';
import { deleteTodo } from './todoListService/deleteService';
import { searchTodo } from './todoListService/searchService';
import * as todoService from './todoListService/todoService';

import { login } from './userService/loginService';
// import {} from './userService/logoutService'

import { downloadTodos } from './resourceService/downloadTodos';
import { fetchTodos } from './resourceService/fetchTodos';
import { refreshAcsToken } from './resourceService/refreshAcsToken';

const SERVICES = {
  addTodo: addTodo,
  deleteTodo: deleteTodo,
  editTodo: editTodo,
  searchTodo: searchTodo,
  todoService: todoService,

  login: login,

  downloadTodos: downloadTodos,
  fetchTodos: fetchTodos,
  refreshAcsToken: refreshAcsToken
};

export default SERVICES;
