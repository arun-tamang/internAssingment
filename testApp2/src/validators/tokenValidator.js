import * as tokenService from '../services/tokenService';

//token stuffs
export async function validateToken(req, res, next) {
  // console.log('from validate token', req.headers);
  let token = req.headers.authorization;
  return tokenService.verifyAccessToken(token, req, res, next);
}

export async function validateRefreshToken(req, res, next) {
  let token = req.headers.authorization;
  try{
    let result = await tokenService.verifyRefreshToken(token);
    // console.log('result of tokenService.verifyRefreshToken');
    // console.log(!result);
    next();
  } catch(err) {
    next(err);
  }

}
