import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import formatPhone from "../utils/format-phone";
import ErrorAlert from "../layout/ErrorAlert";

import "./ReservationsStyle.css";

// Form for handling a reservation. 'Edit' bool checks if you are editing a new or existing reservation.
export default function ReservationForm({ resExists, edit = false }) {
  const URL = process.env.REACT_APP_API_BASE_URL + "/reservations";
  const history = useHistory();

  const initForm = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [formData, setFormData] = useState(
    resExists || initForm
  );
  const [error, setError] = useState(null);

  const handleUpdate = (event) => {
    event.preventDefault();
    if (event.target.name !== "people") {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    } else {
      setFormData({
        ...formData,
        people: parseInt(event.target.value),
      });
    }
  };

  const handlePhoneUpdate = (event) => {
    const formattedPhoneNumber = formatPhone(event.target.value);
    setFormData({
      ...formData,
      mobile_number: formattedPhoneNumber,
    });
  };

  // Handles a request to update an existing reservation or create a new reservation.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const abortController = new AbortController();
    try {
      if (edit) {
        await axios.put(`${URL}/${resExists.reservation_id}`, {
          data: formData,
          signal: AbortController.signal,
        });
      } else {
        await axios.post(URL, {
          data: formData,
          signal: AbortController.signal,
        });
      }

      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      setError(error.response.data.error);
    }

    return () => abortController.abort();
  };

  return (
    <div>
      <div>
        <ErrorAlert error={error} />
      </div>

      <form onSubmit={handleSubmit}>

        {/* first name */}
        <div className="input-group formEntry mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <span className="oi oi-person mr-2"></span>
              First Name
            </span>
          </div>
          <label className="sr-only" htmlFor="first_name">
            First Name:
          </label>
          <input className="form-control"
            id="first_name"
            name="first_name"
            aria-label="first_name"
            type="text"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleUpdate}
            required={true}
          />
        </div>

        {/* last name */}
        <div className="input-group formEntry  mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <span className="oi oi-person mr-2"></span>
              Last Name
            </span>
          </div>
          <label className="sr-only" htmlFor="first_name">
            Last Name:
          </label>
          <input className="form-control"
            id="last_name"
            name="last_name"
            aria-label="last_name"
            type="text"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleUpdate}
            required={true}
          />
        </div>

        {/* phone number */}
        <div className="input-group formEntry mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <span className="oi oi-phone mr-2"></span>
              Phone Number
            </span>
          </div>
          <label className="sr-only" htmlFor="mobile_number">
            Phone Number:
          </label>
          <input className="form-control"
            id="mobile_number"
            name="mobile_number"
            aria-label="phone_number"
            type="tel"
            placeholder="***-***-****"
            minLength="12"
            value={formData.mobile_number}
            onChange={handlePhoneUpdate}
            required={true}
          />
        </div>

        {/* date */}
        <div className="input-group formEntry  mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <span className="oi oi-calendar mr-2"></span>
              Date
            </span>
          </div>
          <label className="sr-only" htmlFor="reservation_date">
            Date of Reservation:
          </label>
          <input className="form-control"
            id="reservation_date"
            name="reservation_date"
            aria-label="reservation_date"
            type="date"
            value={formData.reservation_date}
            onChange={handleUpdate}
            required={true}
          />
        </div>

        {/* time */}
        <div className="input-group formEntry mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <span className="oi oi-clock mr-2"></span>
              Time
            </span>
          </div>
          <label className="sr-only" htmlFor="reservation_time">
            Time of Reservation:
          </label>
          <input className="form-control"
            id="reservation_time"
            name="reservation_time"
            aria-label="reservation_time"
            type="time"
            pattern="[0-9]{2}:[0-9]{2}"
            value={formData.reservation_time}
            onChange={handleUpdate}
            required={true}
          />
        </div>

        {/* number of guests */}
        <div className="input-group formEntry mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <span className="oi oi-people mr-2"></span>
              Number of Guests
            </span>
          </div>
          <label className="sr-only" htmlFor="people">
            Number of Guests:
          </label>
          <input className="form-control"
            id="people"
            name="people"
            aria-label="people"
            type="number"
            min="1"
            value={formData.people}
            onChange={handleUpdate}
            required={true}
          />
        </div>

        {/* Submit / Cancel */}
        <button
          type="button"
          className="btn btn-danger mr-2"
          onClick={() => history.goBack()}
        >
          <span className="oi oi-trash mr-2" />
          Discard
        </button>

        <button type="submit" className="btn btn-warning">
          <span className="oi oi-check mr-2" />
          Submit
        </button>
      </form>
    </div>
  );
}