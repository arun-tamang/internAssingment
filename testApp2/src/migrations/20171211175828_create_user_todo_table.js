/**
 * Create todos table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('user_todo', table => {
    table.increments();
    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
    table.string('name').notNull();
    table.boolean('completed').notNull().defaultTo(false);
    table.integer('user_id').references('id').inTable('users');
  });
}

/**
 * Drop todos table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('user_todo');
}
