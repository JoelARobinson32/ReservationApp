const knex = require('../db/connection');

function dateList(date) {
  return knex('reservations')
    .select('*')
    .where({ "reservation_date": date })
    .whereNot({ status: 'finished' })
    .whereNot({ status: 'cancelled' })
    .orderBy('reservation_time');
}

function IDList(reservation_id) {
  return knex('reservations')
  .select('*')
  .where({ "reservation_id": reservation_id })
  .first();
}

function phoneList(mobile_number) {
  return knex('reservations').select('*')
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    );
}

function create(reservation) {
  return knex('reservations')
    .insert(reservation)
    .returning('*')
    .then(newRecord => newRecord[0]);
}

function update(reservation) {
  return knex("reservations")
    .select("*")
    .where({ "reservation_id": reservation.reservation_id })
    .update(reservation, "*")
    .then((updatedRecord) => updatedRecord[0]);
}

module.exports = {
  dateList,
  IDList,
  phoneList,
  create,
  update
};
