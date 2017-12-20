import Joi from 'joi';
import validate from '../utils/validate';
import * as userTodoService from '../services/userTodoService';

const SCHEMA = {
  name: Joi.string()
    .label('Name')
    .max(90)
    .required()
};

/**
 * Validate create/update user request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function userTodoValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate userTodos existence.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function findUserTodo(req, res, next) {
  return userTodoService
    .getUserTodo(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export { findUserTodo, userTodoValidator };
