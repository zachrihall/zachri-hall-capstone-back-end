//chat room name has to be unique cant be taken by another chat room will have to vaildate for that

exports.up = function (knex) {
    return knex.schema
        .createTable('users', (table) => {
            table.increments('id').primary();
            table.string('username').notNullable();
            table.string('password').notNullable();
            table.string('sport');
            table.string('profile_photo');
            table.integer('distance_preference');
            table.string('sports_preference').defaultTo("all");
        })
        .createTable('posts', (table) => {
            table.increments('id').primary();
            table.string('notes').notNullable();
            table.string('sport').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.string('geo_latitude').notNullable();
            table.string('geo_longitude').notNullable();
            table.string('chat_id').notNullable();
            table.integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .notNullable()
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        }).createTable('chat_rooms', (table) => {
            table.increments('id').primary();
            table.string('chat_id')
                .notNullable()
            table.string('chat_name').notNullable();
            table.integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .notNullable()
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        }).createTable('messages', (table) => {
            table.increments('id').primary();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .notNullable()
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.string('chat_id').notNullable();
            table.string('message');
            table.string('username').notNullable();
        })
}

exports.down = function (knex) {
    return knex.schema.dropTable('messages').dropTable('chat_rooms').dropTable('posts').dropTable('users');
};

