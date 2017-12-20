
export function up(knex) {
  return knex.schema.createTable('tags_user_todo', (table) => {
    table.increments();
    // table.timestamp('created_at').defaultTo(knex.raw('now()')).notNull();
    // table.timestamp('updated_at').notNull();
    table.integer('user_todo_id').references('id').inTable('user_todo').onDelete('CASCADE');
    table.integer('tag_id').references('id').inTable('tags').onDelete('CASCADE');
  });
}

export function down(knex) {
  return knex.schema.dropTable('tags_user_todo');
}
