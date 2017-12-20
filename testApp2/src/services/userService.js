import Boom from 'boom';
import User from '../models/user';
import HttpStatus from 'http-status-codes';
import * as tokenService from './tokenService';
import * as jwt from '../utils/jwt.js';
import JWT from 'jsonwebtoken';


/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllUsers() {
  return User.fetchAll();
}

/**
 * Get a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getUser(id) {
  return new User({ id }).fetch().then(user => {
    if (!user) {
      throw new Boom.notFound('User not found');
    }

    return user;
  });
}

/**
 * Create new user.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
export function createUser(user) {
  // user parameter is json object u pass
  return new User({
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    password: user.password
  }).save().then(user => user.refresh());
}

/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         user
 * @return {Promise}
 */
// export function updateUser(id, user) {
//   return new User({ id })
//     .save({ name: user.name })
//     .then(user => user.refresh());
// }

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteUser(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}

export function getUserByEmail(email) {
  return User.getUserByEmail(email);
}

export function getUserByPassword(password) {
  return User.getUserByPassword(password);
}

export function getUserInfo(email) {
  // return getUserByName(name);
  return getUserByEmail(email);
}

export async function validateUser(loginParams) {
  let email = loginParams.email;
  let password = loginParams.password;
  let validated = false;
  try {
    let rawUserInfo = await getUserInfo(email);
    if(rawUserInfo === null) {
      throw ('wrong email or password. Try again.');
    }
    let userInfo = rawUserInfo.toJSON();
    if(userInfo.password === password) {
      validated = true;
      // console.log('user is validated');
      return {validated, userInfo};
    } else {
      // wrong password or username
      // console.log('wrong password or username');
      validated = false;
      return {validated, userInfo};
    }
  } catch(e) {
    // i think this would be suitable when getUserInfo returns null and we try to access userInfo.password
    throw (e);
  }
}
