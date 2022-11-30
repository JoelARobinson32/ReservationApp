const knex = require('../db/connection');

function list() {
  return knex('tables').select('*').orderBy('table_name');
}

function listTable(table_id) {
  return knex('tables')
    .select('*')
    .where({ "table_id": table_id })
    .first();
}

function create(table) {
  return knex('tables')
    .insert(table)
    .returning('*')
    .then(newRecord => newRecord[0]);
}

function update(table) {
  return knex("tables")
    .select("*")
    .where({ "table_id": table.table_id })
    .update(table, "*")
    .then((updatedRecord) => updatedRecord[0]);
}

module.exports = {
  list,
  listTable,
  create,
  update,
};
