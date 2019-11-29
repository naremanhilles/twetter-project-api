const knex = require('../knex');

const create = (tweat_info) =>
    knex('tweat')
        .insert(tweat_info)
        .returning(['id'])

const view_all = () =>
    knex('tweat')
        .select(['tweat.id', 'tweat.text', 'tweat.createdAt', 'users.name'])
        .innerJoin('users', 'users.id', 'tweat.user_id')

const view = (id) =>
    knex('tweat')
        .where('id', '=', id)

const delete_tweat = (id) =>
    knex('tweat')
        .where('id', '=', id)
        .del()

module.exports = { create, view, delete_tweat, view_all };
