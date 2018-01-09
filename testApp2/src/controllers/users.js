import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as userService from '../services/userService';
import * as jwt from '../utils/jwt';
import { findUser, userValidator } from '../validators/userValidator';
import { findUserTodo, userTodoValidator } from '../validators/userTodoValidator';
import * as tokenValidator from '../validators/tokenValidator';
import userTodoController from './userTodo.js';
import * as userTodoService from '../services/userTodoService';
import { process } from 'joi/lib/errors';
// import paginateTodo from './paginateTodo';


const router = Router();

/**
 * GET /api/users
 */
router.get('/', (req, res, next) => {
  userService
    .getAllUsers()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * GET /api/users/:id
 */
router.get('/:id', tokenValidator.validateToken, (req, res, next) => {
  userService
    .getUser(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

router.get('/:id/todo/search', tokenValidator.validateToken, (req, res, next) => {
  console.log('from users..............................................', req.query);
  userTodoService
    .searchUserTodo(req.params.id, req.query)
    .then(data => {
      // paginateTodo(data);
      res.json({data, metadata: data.pagination});
    })
    .catch(err => next(err));
  // console.log(req.query); // req.query gives object with keys
});
// It is crucial that you put search before below .get because it matches /search as well.


// Handle requests for user todos.
router.get('/:id/todo/:pageNo', tokenValidator.validateToken, (req, res, next) => {
  // console.log('the id is:');
  // console.log(req.params.id);
  console.log('Cluster', process.pid);
  userTodoService
    .getUserTodo(req.params.id, req.params.pageNo)
    .then(data => {
      // paginateTodo(data);
      console.log('data...........');
      console.log(data.pagination);
      res.json({data, metadata: data.pagination});
    })
    .catch(err => next(err));
});
// Send user todo requests to separate controller.
// router.use('/:id/todo', userTodoController);

/**
 * POST /api/users
 */
router.post('/', userValidator, (req, res, next) => {
  userService
    .createUser(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

/**
 * PUT /api/users/:id
 */
router.put('/:id', tokenValidator.validateToken, findUser, userValidator, (req, res, next) => {
  userService
    .updateUser(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

// router.put('/:id/todo', findUserTodo, userTodoValidator, (req, res, next) => {
//   userTodoService
//     .updateUserTodo(req.params.id, req.body)
//     .then(data => res.json({ data }))
//     .catch(err => next(err));
// });
router.put('/:id/todo', tokenValidator.validateToken, findUserTodo, (req, res, next) => {
  userTodoService
    .updateUserTodo(req.params.id, req.body)
    .then(data => res.json(data))
    .catch(err => next(err));
});

// now to edit individual todo
router.put('/:id/todo/:todoId', tokenValidator.validateToken, (req, res, next) => {
  console.log('todoId: ', req.params.todoId);
  console.log('req.body.name: ', req.body.name);
  userTodoService
    .editUserTodo(req.params.todoId, req.body.name)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', tokenValidator.validateToken, findUser, (req, res, next) => {
  userService
    .deleteUser(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});

router.delete('/:id/todo/:todoId', tokenValidator.validateToken, (req, res, next) => {
  console.log('req.params.todoId');
  console.log(req.params.todoId);
  userTodoService
    .deleteUserTodo(req.params.id, req.params.todoId)
    .then(data => {
      // paginateTodo(data);
      res.json(data);
      // return ('successfully deleted todoId: ' + todoId);
    })
    .catch(err => next(err));
  // console.log(req.query); // req.query gives object with keys
});

export default router;
