import bookshelf from '../db';

const TABLE_NAME = 'tags_user_todo';

/**
 * Todo model.
 */
class TodoTagLinker extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return false;
  }
}

export default TodoTagLinker;
