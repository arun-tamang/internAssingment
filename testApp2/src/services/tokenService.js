import Boom from 'boom';
import httpError from 'http-status-codes';
import * as jwt from '../utils/jwt';
import RfsTokens from '../models/rfsTokens'
// import * as auth from '../constant/auth.json';
// import * as sessionService from '../service/session';
// import * as userTokenService from '../service/userToken';


export function fetchTokens(params) {
  return jwt.generateTokens(params);
}

export async function verifyRefreshToken(rfsToken) {
  // console.log('inside verifyRefreshToken()');
  // console.log(rfsToken);
  return new RfsTokens().query('where', 'name', '=', rfsToken)
    .fetch()
    .then(refsToken => {
      // console.log('inside .then()');
      if(!refsToken) {
        // console.log('RefreshToken not found. Try again or login');
        throw new Boom.notFound('RefreshToken not found. Try again or login');
      }
      return refsToken;
    });
}

export function fetchAccessToken(params) {
  return jwt.generateAccessToken(params);
}

export function checkRefreshToken(token) {
  return jwt.checkRefreshToken(token);
}

export function verifyAccessToken(acsToken, req, res, next) {
  return jwt.verifyAccessToken(acsToken, req, res, next);
}

export function addRefreshToken(rfsToken) {
  return new RfsTokens({
    name: rfsToken
  }).save().then(refsToken => refsToken.refresh());
}

export function removeRefreshToken(rfsToken) {
  return new RfsTokens({name: rfsToken}).fetch().then(refsToken => refsToken.destroy());
}
