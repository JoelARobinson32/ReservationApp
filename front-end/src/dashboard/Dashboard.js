import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";

import ReservationList from "../reservations/ReservationList";
import TableList from "../tables/TableList";

import { listReservations, listTables } from "../utils/api";
import { today, previous, next, getDisplayDate } from "../utils/date-time";
import useQuery from "../utils/useQuery";


// Handle the Dashboard, as named by origninal repo but will be referred to as 'Home'

// List relevent Information
function Dashboard({ date }) {
  const history = useHistory();

  const [reservations, setReservations] = useState([]);
  const [resErr, setResErr] = useState(null);
  const [tables, setTables] = useState([]);
  const [tabErr, setTabErr] = useState(null);

  const query = useQuery();
  date = query.get("date") || date;
  const displayDate = getDisplayDate(date);

  useEffect(loadDashboard, [date, displayDate.display]);

  // Load reservation and table information and handle errors.
  function loadDashboard() {
    const abortController = new AbortController();
    setResErr(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(
        setResErr(
          <div className="alert alert-warning border border-warning my-2">
            No Reservations on {displayDate.display}
          </div>
        )
      );
    listTables(abortController.signal).then(setTables).catch(setTabErr);
    return () => abortController.abort();
  }

  return (
    <main>
      <div>
      {/*Date buttons/form Make a seperate componant for this later so it's not listed twice*/}
      <div className="input-group input-group-sm">

        {/* Next Day */}
        <button
          type="button"
          className="btn btn-warning btn-sm mt-3 mb-3 mr-2"
          onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
        >
          <span className="oi oi-caret-left mr-1" />
        </button>

        {/* Form */}
        <span className="d-inline-flex p-2 oi oi-calendar mt-3 mr-1" />
        <input
          type="date"
          className="form-control mt-3 mb-3 mr-2"
          style={{ maxWidth: "150px", minWidth: "110px" }}
          onChange={(event) =>
            history.push(`/dashboard?date=${event.target.value}`)
          }
          value={date}
        />

        {/* Day Before */}
        <button
          type="button"
          className="btn btn-warning btn-sm mt-3 mb-3 mr-2"
          onClick={() => history.push(`/dashboard?date=${next(date)}`)}
        >
          <span className="oi oi-caret-right ml-1" />
        </button>
      </div>

      {/* Header info */}
        <h1 className="mb-4">Home</h1>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">{displayDate.display}</h4>
        </div>

        {/* reservations section */}
        <div>
          <h5 className="mt-3">Reservations</h5>
        </div>
        <div>
          {!reservations.length && resErr}
        </div>
        <div>
          {reservations.length > 0 && (
            <ReservationList reservations={reservations} />
          )}
        </div>

        {/* tables section */}
        <ErrorAlert error={tabErr} />
        <div>
          <h5 className="mt-4">Tables</h5>
        </div>
        <div>
          <TableList tables={tables} />
        </div>
      </div>

      {/*Date buttons/form*/}
      <div className="input-group input-group-sm">
        {/* Next Day */}
        <button
          type="button"
          className="btn btn-warning btn-sm mt-3 mb-3 mr-2"
          onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
        >
          <span className="oi oi-caret-left mr-1" />
        </button>

        {/* Form */}
        <span className="d-inline-flex p-2 oi oi-calendar mt-3 mr-1" />
        <input
          type="date"
          className="form-control mt-3 mb-3 mr-2"
          style={{ maxWidth: "150px", minWidth: "110px" }}
          onChange={(event) =>
            history.push(`/dashboard?date=${event.target.value}`)
          }
          value={date}
        />

        {/* Day Before */}
        <button
          type="button"
          className="btn btn-warning btn-sm mt-3 mb-3 mr-2"
          onClick={() => history.push(`/dashboard?date=${next(date)}`)}
        >
          <span className="oi oi-caret-right ml-1" />
        </button>
      </div>
    </main>
  );
}

export default Dashboard;