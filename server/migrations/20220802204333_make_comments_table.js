exports.up = function (knex) {
    return knex.schema.createTable('comments', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').notNullable().onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.string('comment').nullable();
    })
};


exports.down = function (knex) {

};
