import * as tokenService from '../services/tokenService';

//token stuffs
export async function validateToken(req, res, next) {
  let token = req.headers.authorization;
  tokenService.verifyAccessToken(token, req, res, next);
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
