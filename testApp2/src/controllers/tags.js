import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as tagService from '../services/tagService';
import * as tokenValidator from '../validators/tokenValidator';

const router = Router();

router.get('/:id', tokenValidator.validateToken, (req, res, next) => {
  console.log('from tag controller: req.headers: ', req.headers.authorization);
  // console.log(req.params.id); // prints undefined
  tagService
    .getAllTags()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

export default router;
