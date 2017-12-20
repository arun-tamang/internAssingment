import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as userTodoService from '../services/userTodoService.js';

const router = Router();

// Handle individual todos for each user using their ids

router.get('/', (req, res, next) => {
  console.log('the id is:');
  console.log(req.params.id);  // prints undefined
  userTodoService
    .getUserTodo(req.params.id)
    .then(data => res.json({data}))
    .catch(err => next(err));
});

export default router;
