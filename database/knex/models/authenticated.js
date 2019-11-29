const knex = require('../knex');

const create = (user_info) =>
    knex('users')
        .insert(user_info)
        .returning(['id'])

const get = (email) =>
    knex('users')
        .select()
        .where('email', '=', email)

const activate = (id) =>
    knex('users')
        .where('id', '=', id)
        .update({
            is_active: true,
        })


module.exports = { create, get, activate };



