import Boom from 'boom';
import Todo from '../models/todo';

/**
 * Get all todos.
 *
 * @return {Promise}
 */
export function getAllTodos() {
  return Todo.fetchAll();
}

/**
 * Get a todo.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getTodo(id) {
  return new Todo({ id }).fetch().then(todo => {
    if (!todo) {
      throw new Boom.notFound('Todo not found');
    }

    return todo;
  });
}

/**
 * Create new todo.
 *
 * @param  {Object}  todo
 * @return {Promise}
 */
export function createTodo(todo) {
  console.log(todo);
  return new Todo({ name: todo.name }).save().then(todo => todo.refresh());
}

/**
 * Update a todo.
 *
 * @param  {Number|String}  id
 * @param  {Object}         todo
 * @return {Promise}
 */
export function updateTodo(id, todo) {
  return new Todo({ id })
    .save({ name: todo.name })
    .then(todo => todo.refresh());
}

/**
 * Delete a todo.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteTodo(id) {
  return new Todo({ id }).fetch().then(todo => {
    todo.destroy();
    // console.log('My todo..................')
    // console.log(todo);
    // console.log('...............');
  });
}
