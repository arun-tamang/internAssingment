import bookshelf from '../db';

const TABLE_NAME = 'users';

/**
 * User model.
 */
class User extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  static getUserByEmail(email) {
    return User.where('email', email).fetch();
  }

  static getUserByPassword(password) {
    return User.where('password', password).fetch();
  }
}

export default User;
