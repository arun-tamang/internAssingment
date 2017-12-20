
export function up(knex) {
  return knex.schema.createTable('rfs_tokens', table => {
    table.increments();
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
    table.string('name').notNull().unique();
  });
};

export function down(knex) {
  return knex.schema.dropTable('rfs_tokens');
};
