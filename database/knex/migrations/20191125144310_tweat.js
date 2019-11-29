exports.up = function (knex, Promise) {
    knex.schema.hasTable('tweat').then(exists => {
        if (exists) return;

        return knex.schema.createTable("tweat", function (table) {
            table.increments();
            table.string("text")
            table.string("photo")
            table.integer('user_id').unsigned()
            table.foreign("user_id").references("users.id");
            table.dateTime('createdAt').notNull();
            table.dateTime('updatedAt').nullable();
        })
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable("tweat")
};

