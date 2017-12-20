import knexJs from 'knex';
import knexConfig from './knexfile';
import bookshelfJs from 'bookshelf';
// import cascadeDelete from 'bookshelf-cascade-delete'


/**
 * Database connection.
 */
const knex = knexJs(knexConfig);
const bookshelf = bookshelfJs(knex);

// bookshelf.plugin(cascadeDelete);

bookshelf.plugin([
  'virtuals',
  'pagination',
  'visibility',
  'bookshelf-camelcase'
]);

export default bookshelf;
