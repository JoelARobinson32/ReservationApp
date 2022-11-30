/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL = "postgres://tpyfklff:sqg48Z-ZcHr1H05F5fdjW7W7Sa9Uggig@peanut.db.elephantsql.com/tpyfklff",
  DATABASE_URL_DEVELOPMENT = "postgres://wcfsfqux:jPfnJuLpdgTL_OQTlHZweLPD-Z7GkwCU@peanut.db.elephantsql.com/wcfsfqux",
  DATABASE_URL_TEST = "postgres://ttixbwra:FxMhOIo8tOJc92rqMbZEY1NpBgo4ou6O@peanut.db.elephantsql.com/ttixbwra",
  DATABASE_URL_PREVIEW = "postgres://nzgiiixk:17pJj1cza6nkF-p_n0UidW2Jjw4o60jt@peanut.db.elephantsql.com/nzgiiixk",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
