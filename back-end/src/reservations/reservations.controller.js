const reservationsService = require('./reservations.service');

const hasProperties = require('../errors/hasProperties');
const setError = require('../errors/setError');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// Validators
function hasData(req, res, next) {
  if (req.body && req.body.data) next();
  else setError(400, "Data is missing", next);
}

const hasAllProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

function isValidDate(req, res, next) {
  if (Date.parse(req.body.data.reservation_date)) {
    next();
  } else {
    setError(400, "Invalid reservation_date", next);
  }
}

//Tedius
function isValidTime(req, res, next) {
  const resTime = req.body.data.reservation_time;
  if (/^0[0-9]|1[0-9]|2[0-3]:[0-5][0-9] to 0[0-9]|1[0-9]|2[0-3]:[0-5][0-9]$/.test(resTime)) { 
    next();
  } else {
    setError(400, "Invalid reservation_time", next);
  }
}

function isValidPeople(req, res, next) {
  if ((req.body.data.people > 0) &&
       Number.isInteger(req.body.data.people)) {
         next();
       } else { 
         setError(400, "There must be more than 0 people", next);
       }
}

function isValidStatus(validStatus) {
  return (req, res, next) => {
    if (!req.body.data.status || 
        validStatus.includes(req.body.data.status)) { 
          next();
    } else {
        const booked = req.body.data.status;
        setError(400, `Invalid status: ${req.body.data.status}`, next);
    }
  }
}

function isOpenDate(req, res, next) {
  const date = new Date(req.body.data.reservation_date + 'T' + req.body.data.reservation_time);
  if (date.getDay() !== 2) {
    res.locals.date = date;
    next();
  } else {
    setError(400, "Sorry but we, the weirdest restaurant in history, are closed exclusively on Tuesdays for some reason", next);
  }
}

function isFutureDate(req, res, next) {
  if (res.locals.date > (new Date)) {
    next();
  }
  else { 
    setError(400, "The reservation_date should be in the future when it will be possible to attend", next);
  }
}

function isOpenHour(req, res, next) {
  if ((req.body.data.reservation_time >= '10:30') && 
     (req.body.data.reservation_time <= '21:30')) {
    res.locals.reservation = req.body.data;
    next();
  } else { 
    setError(400, "That reservation_time is outside business hours. Time must be after 10:30 and before 21:30", next);
  }
}

function isValidQuery(req, res, next) {
  if (req.query.date) {
    res.locals.date = req.query.date;
    next();
  } else if (req.params.reservation_id) {
    res.locals.reservation_id = req.params.reservation_id;
    next();
  } else if (req.query.mobile_number) {
    res.locals.mobile_number = req.query.mobile_number;
    next();
  } else {
    setError(400, "Invalid list query", next);
  }
}

function reservationExists(req, res, next) {
  reservationsService
    .IDList(req.params.reservation_id)
    .then(data => {
      if (data) {
        res.locals.reservation = data;
        next();
      } else {
        const resID = req.params.reservation_id;
        setError(404, `reservation_id: ${resID} not found`, next);
      }
    })
}

function isAfterReservation(req, res, next) {
  if (res.locals.reservation.status !== "finished") {
    next();
  }
  else {
    const resStatus = res.locals.reservation.status;
    setError(400, `Reservation status update to: =${resStatus}`, next);
  }
}

async function list(req, res, next) {
  if (res.locals.date) { 
    return reservationsService.dateList(res.locals.date)
  } else if (res.locals.mobile_number) {
    return reservationsService.phoneList(res.locals.mobile_number)
  }
  else {
    return reservationsService.IDList(res.locals.reservation_id)
             .then(data => data ? data : Promise.reject({ status: 404, message: `reservation_id: ${res.locals.reservation_id} not found` }));
    }
}

async function create(req, res, next) {
  return reservationsService
    .create(res.locals.reservation)
    .then(rsp => {
      ({ created_at, updated_at, ...data } = rsp);
      return data;
    })
}

async function updateStatus(req, res, next) {
  res.locals.reservation.status = req.body.data.status;
  return reservationsService
    .update(res.locals.reservation)
    .then(rsp => ({status: rsp.status}));
}

async function update(req, res, next) {
  return reservationsService
    .update(res.locals.reservation)
    .then(rsp => {
      ({ 
        status, reservation_id, created_at, updated_at, ...data } = rsp);
        return data;
      })
}

module.exports = {
  list: [
    isValidQuery,
    asyncErrorBoundary(list),
  ],
  create: [
    hasData,
    hasAllProperties,
    isValidDate,
    isValidTime,
    isValidPeople,
    isValidStatus(["booked"]),
    isOpenDate,
    isFutureDate,
    isOpenHour,
    asyncErrorBoundary(create, 201)
  ],
  updateStatus: [
    reservationExists,
    isValidStatus(["booked", "seated", "finished", "cancelled"]),
    isAfterReservation,
    asyncErrorBoundary(updateStatus, 200)
  ],
  update: [
    hasData,
    reservationExists,
    hasAllProperties,
    isValidDate,
    isValidTime,
    isValidPeople,
    isOpenDate,
    isFutureDate,
    isOpenHour,
    asyncErrorBoundary(update, 200)
  ],
};
