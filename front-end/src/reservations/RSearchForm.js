import React, { useState, useEffect } from "react";

import formatPhone from "../utils/format-phone";
import { listReservationsByNumber } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

import ReservationsList from "./ReservationsList";

import "./ReservationsStyle.css";

// Search form
export default function RSearchForm() {
  const initialFormState = {
    mobile_number: '',
  };
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ ...initialFormState });

  const handleUpdate = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const abortController = new AbortController();
    listReservationsByNumber(formData.mobile_number, abortController.signal)
      .then(data => {
        if (data && data.length) setReservations(data)
        else setError({ message: `No reservations found for mobile_number=${formData.mobile_number}` });
      })
      .catch(err => setError(err));
  };

  const reservationsList = reservations.map(
    (reservation) => <tr key={`rsv-${reservation.reservation_id}`}><ReservationsList reservation={reservation} /></tr>
  );

  return (
    <div>
      <div className="mb-4">
        <ErrorAlert error={error} />
      </div>

      <form onSubmit={handleSubmit}>

      <div className="mb-2"> 
        Search by Guest Phone Number:  
      </div>
        <div className="input-group mb-3 formEntry">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <span className="oi oi-phone mr-2"></span>
              Phone Number
            </span>
          </div>
          <label className="sr-only" htmlFor="mobile_number">
            Phone Number
          </label>
          <input className="form-control"
            id="mobile_number"
            name="mobile_number"
            aria-label="phone_number"
            type="text"
            placeholder="***-***-****"
            value={formData.mobile_number}
            onChange={handleUpdate}
            required={true}
          />
        </div>

        <div>
          <button type="submit" className="btn btn-warning mb-3" style={{ minWidth: 155 }}>
            <span className="oi oi-magnifying-glass mr-2" />
            Search
          </button>
        </div>

      </form>
      <div>
        <ErrorAlert error={error} />
        {reservationsList}
      </div>
    </div>
  );
}