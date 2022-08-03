exports.up = function (knex) {
    return knex.schema
        .createTable('users', (table) => {
            table.increments('id').primary();
            table.string('username').notNullable();
            table.string('password').notNullable();
            table.string('console').notNullable();
            table.string('fav_game').notNullable();
        })
        .createTable('posts', (table) => {
            table.increments('id').primary();
            table.string('game-title').notNullable();
            table.string('notes').notNullable();
            table.string('console').notNullable();
            table.integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .notNullable()
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
}

exports.down = function (knex) {
    return knex.schema.dropTable('posts').dropTable('users');
};