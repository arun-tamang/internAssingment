import bookshelf from '../db';
import Tags from './tags';

const TABLE_NAME = 'user_todo';

/**
 * Todo model.
 */
class UserTodo extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  tags() {
    return this.belongsToMany(Tags);
  }
}

export default UserTodo;
