import bookshelf from '../db';

const TABLE_NAME = 'rfs_tokens';

// Model for tags tableName
class RfsTokens extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
}

export default RfsTokens;
