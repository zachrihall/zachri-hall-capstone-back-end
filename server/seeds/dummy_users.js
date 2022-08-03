// const uid = require('uniqid');

const users_seed_data = [
  {
    id: 1,
    username: 'codguy1',
    password: '93n2dn92jksdiq823n08r23',
    console: 'playstation',
    fav_game: 'black ops 2'
  },

  {
    id: 2,
    username: 'haloguy2',
    password: '93n2dn9q43rgeearg823n08r23',
    console: 'xbox',
    fav_game: 'black ops 2'
  },

  {
    id: 3,
    username: 'marioIRL',
    password: '93asdagn2dn9q823n08r23',
    console: 'nintendo switch',
    fav_game: 'mario kart 8'
  }
];

const posts_seed_data = [
  {
    id: 1,
    'game-title': 'cod bo4 snd pubs',
    notes: 'looking for a team to play snd with no sweats no squeakers',
    console: 'xbox',
    user_id: 1
  },
  {
    id: 2,
    'game-title': 'cod bo4 snd pubs',
    notes: 'looking for one teammate for snd pubs',
    console: 'xbox',
    user_id: 1
  },
  {
    id: 3,
    'game-title': 'mario kart 8',
    notes: 'need two more for mario kart timed trials',
    console: 'nintendo switch',
    user_id: 3
  }
];


exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert(users_seed_data);
  await knex('posts').del()
  await knex('posts').insert(posts_seed_data);
};
