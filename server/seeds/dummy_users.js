// const uid = require('uniqid');

const users_seed_data = [
  {
    username: 'codguy1',
    password: '93n2dn92jksdiq823n08r23',
    sport: 'football',
    profile_photo: '<add location after>',
    distance_preference: '4',
    sports_preference: 'football'
  }
];

const posts_seed_data = [
  {
    notes: 'looking for a team to play flag football with',
    sport: 'football',
    user_id: 1
  }
];



exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert(users_seed_data);
  await knex('posts').del()
  await knex('posts').insert(posts_seed_data);
};
