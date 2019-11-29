exports.up = function (knex, Promise) {
    knex.schema.hasTable('users').then(exists => {
        if (exists) return;

        return knex.schema.createTable("users", function (table) {
            table.increments();
            table.string("name")
            table.string('email').unique().notNullable();
            table.string("password")
            table.integer("mobile", 10)
            table.string('user_type').defaultTo('user')
            table.boolean('is_active').defaultTo(false)
            table.dateTime('createdAt').notNull();
            table.dateTime('updatedAt').nullable();
        })
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable("users")
};
