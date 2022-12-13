import React, { useState } from "react";
import { useHistory } from "react-router";

import { addTable } from '../utils/api';
import ErrorAlert from "../layout/ErrorAlert";

import "./TableStyle.css";

// Form for handling a table
export default function TableForm() {
  const history = useHistory();

  const initForm = {
    table_name: "",
    capacity: 0,
  };

  const [formData, setFormData] = useState(initForm);
  const [error, setError] = useState('');

    const handleUpdate = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

    const handleSubmit = async event => {
    event.preventDefault();

    const abortController = new AbortController();
    const newTable = formData;
    newTable.capacity = parseInt(formData.capacity, 10);
    newTable.is_seated = false;
    addTable(newTable, abortController.signal)
      .then(() => history.push(`/dashboard`))
      .catch(err => setError(err));
  };

  return (
    <div>
      <div>
        <ErrorAlert error={error} />
      </div>
      <form onSubmit={handleSubmit}>

        {/* Table name */}
        <div className="input-group formEntry mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <span className="oi oi-tag mr-2"></span>
              Table
            </span>
          </div>
          <label className="sr-only" htmlFor="table_name">
            Table:
          </label>
          <input className="form-control"
            id="table_name"
            name="table_name"
            aria-label="table_name"
            type="text"
            placeholder="Table Name"
            value={formData.table_name}
            onChange={handleUpdate}
            required={true}
          />
        </div>

        {/* size */}
        <div className="input-group formEntry mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <span className="oi oi-people mr-2"></span>
              Seats
            </span>
          </div>
          <label className="sr-only" htmlFor="capacity">
            Seat Capacity:
          </label>
          <input className="form-control"
            id="capacity"
            name="capacity"
            aria-label="seat capacity"
            type="number"
            min="1"
            value={formData.capacity}
            onChange={handleUpdate}
            required={true}
          />
        </div>

        {/* submit / cancel */}
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
