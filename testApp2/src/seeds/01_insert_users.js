/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('users')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          first_name: 'Jane',
          last_name: 'Doe',
          email: 'jane12@mail.com',
          password: 'password1',
          updated_at: new Date()
        }),
        knex('users').insert({
          first_name: 'John',
          last_name: 'Doe',
          email: 'johnny@bravo.com',
          password: 'password2',
          updated_at: new Date() })
      ]);
    });
}
