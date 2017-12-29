import { Router } from 'express';
import * as adminService from '../services/adminService.js';
import * as userService from '../services/userService';
import { findUser, userValidator } from '../validators/userValidator';
import * as tokenValidator from '../validators/tokenValidator';


const router = Router();

router.post('/register', userValidator, (req, res, next) => {
  adminService.register(req, res, next);
});

router.post('/login', (req, res, next) => {
  adminService.login(req, res, next)
    .then((data) => res.json(data))
    .catch(e => next(e));
});

router.post('/refresh', tokenValidator.validateRefreshToken,
  (req, res, next) => {
    adminService.refreshAccessToken(req.headers.authorization)
      .then(accessToken => res.json({ accessToken }))
      .catch(err => next(err));
    // here .then is used does our function automatically become a promise here?
    // Ans: adminService.refreshAccessToken is async function and so it returns a
    // promise and so I was able to use .then and .catch(). 
    // res.send('halted for now');
  }
);

router.delete('/logout', tokenValidator.validateRefreshToken,
  (req, res, next) => {
    adminService.logout(req, res, next)
      .then((data) => res.json({data, message: 'successfully logged out'}))
      .catch(e => next(e));
  }
);

export default router;
