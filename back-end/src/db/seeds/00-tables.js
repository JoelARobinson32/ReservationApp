const tables = require("./00-tables.json");

exports.seed = function (knex) {
  return knex("tables")
    .del()
    .then (function () {
      return knex ('tables').insert (tables);
    });
};
