import React, { useState, useEffect } from "react";

import formatPhone from "../utils/format-phone";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

import ReservationList from "./ReservationList";

import "./ReservationsStyle.css";

// Search form
export default function RSearchForm() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState("");
  const [showReservations, setShowReservations] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    async function listMatchingReservations() {
      try {
        if (reservations.length) {
          setShowReservations(
            <ReservationList reservations={reservations} resActive={true} />
          );
        } else if (reservations !== "") {
          setShowReservations(
            <div className="alert alert-info">No reservations found</div>
          );
        }
      } catch (error) {
        setError(error);
      }
    }
    listMatchingReservations();
    return () => abortController.abort();
  }, [reservations]);

  function loadReservations() {
    const abortController = new AbortController();
    setError(null);
    listReservations({ mobile_number: mobileNumber }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    return () => abortController.abort();
  }

  const handleUpdate = (event) => {
    const formattedPhoneNumber = formatPhone(event.target.value);
    setMobileNumber(formattedPhoneNumber);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loadReservations();
  };

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
            value={mobileNumber}
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
        {showReservations}
      </div>
    </div>
  );
}