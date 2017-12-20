
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('tags')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('tags').insert({
          name: 'person'
        }),
        knex('tags').insert({
          name: 'nature'
        }),
        knex('tags').insert({
          name: 'vehicle'
        }),
        knex('tags').insert({
          name: 'building'
        }),
        knex('tags').insert({
          name: 'food'
        }),
        knex('tags').insert({
          name: 'all'
        }),
        knex('tags').insert({
          name: 'gadgets'
        }),
        knex('tags').insert({
          name: 'movies'
        })
      ]);
    });
}
