import { addTodo } from './todoListService/adderService';
import { editTodo } from './todoListService/editService';
import { deleteTodo } from './todoListService/deleteService';
import { searchTodo } from './todoListService/searchService';
import * as todoService from './todoListService/todoService';

import { login } from './userService/loginService';
import { register } from './userService/registerService';
// import {} from './userService/logoutService'

import { downloadTodos } from './resourceService/downloadTodos';
import { fetchTodos } from './resourceService/fetchTodos';
import { refreshAcsToken } from './resourceService/refreshAcsToken';
import { fetchTags } from './resourceService/fetchTags';

import { setTokenInHeader } from './axiosService';

const SERVICES = {
  addTodo,
  deleteTodo,
  editTodo,
  searchTodo,
  todoService,

  login,
  register,

  downloadTodos,
  fetchTodos,
  refreshAcsToken,
  fetchTags,

  setTokenInHeader
};

export default SERVICES;
