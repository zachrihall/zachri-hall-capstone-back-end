// const uid = require('uniqid');

const users_seed_data = [
  {
    id: 1,
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
    id: 1,
    notes: 'looking for a team to play flag football with',
    sport: 'football',
    user_id: 1,
    geo_latitude: 0000000,
    geo_longitude: 0000000
  }
];

const chat_room_seed_data = [
  {
    chat_name: 'bballlovers',
    chat_id: 1,
    user_id: 1
  }
];



exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert(users_seed_data);
  await knex('teams').del()
  await knex('teams').insert(posts_seed_data);
  await knex('chat_rooms').del()
  await knex('chat_rooms').insert(chat_room_seed_data);
};
