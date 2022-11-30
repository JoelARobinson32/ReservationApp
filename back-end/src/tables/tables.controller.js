const tablesService = require('./tables.service');
const reservationsService = require('../reservations/reservations.service');

const hasProperties = require('../errors/hasProperties');
const setError = require('../errors/setError');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// Validators
function hasData(req, res, next) {
  if (req.body && req.body.data) {
    next(); 
  } else {
    setError(400, "No Data Found", next);
  }
}

const hasAllProperties = hasProperties(
  "table_name",
  "capacity",
);

function isValidName(req, res, next) {
  if (req.body.data.table_name.length > 1) {
    next(); 
  } else { 
    setError(400, "table_name should have 2 or more characters", next); 
  }
}

function isValidCapacity(req, res, next) {
  if ((req.body.data.capacity > 0) && 
       Number.isInteger(req.body.data.capacity)) { 
    next(); 
  } else {
    setError(400, "capacity must be greater than 0", next); 
  }
}

function reservationExists(req, res, next) {
  reservationsService
    .IDList(req.body.data.reservation_id)
    .then(data => {
      if (data) {
        res.locals.reservation = data;
        next();
      } else { 
        const resID = req.body.data.reservation_id;
        setError(404, `reservation_id: ${resID} not found`, next); 
      }
    })
}

function isValidResStatus(req, res, next) {
  if (res.locals.reservation.status === "booked") {
    next();
  } else {
  const resStatus = res.locals.reservation.status;
    setError(400, `Reservation status update to: ${resStatus} failed`, next);
  }
}

function tableExists(req, res, next) {
  tablesService
    .listTable(req.params.table_id)
    .then(data => {
      if (data) {
        res.locals.table = data;
        next();
      } else {
        const tableId = req.params.table_id
        setError(404, `table_id: ${tableId} not found`, next);
      }
    })
}

function tableOpen(req, res, next) {
  if (!res.locals.table.is_seated) {
    next();
  } else {
    setError(400, `Table occupied`, next);
  }
}

function tableReserved(req, res, next) {
  if (res.locals.table.is_seated) {
    next();
  } else {
    setError(400, `Table not occupied`, next);
  }
}

function enoughSeats(req, res, next) {
  if (res.locals.reservation.people <= res.locals.table.capacity) { 
    next();
  } else { 
    setError(400, `Party size over table capacity`, next);
  }
}

//Finally all the stuff thats not a validator
async function list(req, res, next) {
  return tablesService.list()
}

async function create(req, res, next) {
  return tablesService
    .create(req.body.data)
    .then(rsp => {
      ({ created_at, updated_at, ...data } = rsp);
      return data;
    })
}

async function seat(req, res, next) {
  res.locals.table.is_seated = true;
  res.locals.table.reservation_id = res.locals.reservation.reservation_id;
  return tablesService.update(res.locals.table)
    .then(() => reservationsService.update({ 
      reservation_id: res.locals.table.reservation_id, status: "seated"
    }));
}
async function unSeat(req, res, next) {
  res.locals.table.is_seated = false;
  return tablesService.update(res.locals.table)
    .then(() => reservationsService.update({ 
      reservation_id: res.locals.table.reservation_id, status: "finished"
    }));
}

module.exports = {
  list: [
    asyncErrorBoundary(list),
  ],

  create: [
    hasData,
    hasAllProperties,
    isValidName,
    isValidCapacity,
    asyncErrorBoundary(create, 201)
  ],

  seat: [
    hasData,
    hasProperties("reservation_id"),
    reservationExists,
    isValidResStatus,
    tableExists,
    tableOpen,
    enoughSeats,
    asyncErrorBoundary(seat, 200)
  ],

  unseat: [
    tableExists,
    tableReserved,
    asyncErrorBoundary(unSeat, 200)
  ],
};
