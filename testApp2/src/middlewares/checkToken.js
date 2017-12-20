import * as jwt from '../utils/jwt';

function checkToken(req, res, next) {
  console.log('inside checkToken');
  req.token = jwt.verifyAccessToken2(req.headers.authorization);
  next();
}

export { checkToken };
