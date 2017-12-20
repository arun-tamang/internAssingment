export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('tags_user_todo')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('tags_user_todo').insert({
          user_todo_id: 1,
          tag_id: 3
        }),
        knex('tags_user_todo').insert({
          user_todo_id: 2,
          tag_id: 8
        }),
        knex('tags_user_todo').insert({
          user_todo_id: 3,
          tag_id: 5
        })
      ]);
    });
}
