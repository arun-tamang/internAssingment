/**
 * Seed userTodo table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('user_todo')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('user_todo').insert({
          name: 'clean my car',
          user_id: 1,
          updated_at: new Date()
        }),
        knex('user_todo').insert({
          name: 'go to the movie-theater',
          user_id: 2,
          updated_at: new Date()
        }),
        knex('user_todo').insert({
          name: 'buy fruits',
          user_id: 2,
          updated_at: new Date()
        })
      ]);
    });
}
