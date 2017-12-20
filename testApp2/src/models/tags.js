import bookshelf from '../db';
import UserTodo from './userTodo';

const TABLE_NAME = 'tags';

// Model for tags tableName
class Tags extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return false;
  }

  static userTodos() {
    return this.belongsToMany(UserTodo);
  }
}

export default Tags;
