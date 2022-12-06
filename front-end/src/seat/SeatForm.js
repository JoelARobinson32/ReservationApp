import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";

import ErrorAlert from "../layout/ErrorAlert";
import axios from "axios";

import TableOpen from "../tables/TableOpen";

import "../tables/TableStyle.css";

// Form for handling seats
export default function SeatForm() {
  const { reservation_id } = useParams();
  const URL = "https://reservationappbyjoelbackend.onrender.com";
  const history = useHistory();

  const [tables, setTables] = useState([]);
  const [currentTable, setCurrentTable] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    async function listTables() {
      try {
        const response = await axios.get(URL + "/tables", {
          signal: abortController.signal,
        });
        setTables(response.data.data);
        setCurrentTable(response.data.data[0].table_id);
      } catch (error) {
        setError(error);
      }
    }
    listTables();
    return () => abortController.abort();
  }, [URL]);

  const handleUpdate = (event) => {
    event.preventDefault();
    setCurrentTable(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${URL}/tables/${currentTable}/seat`, {
        data: { reservation_id: reservation_id },
      });
      history.push("/dashboard");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const choices = tables.map((table) => (
    <TableOpen table={table} key={table.table_id} />
  ));

  return (
    <div>
      <div>
        <ErrorAlert error={error} />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="formEntry mb-3">
          <label className="mr-2 mb-3 font-weight-bolder" htmlFor="table_id">Seat Choice:</label>
          <select className="border border-dark border-2" 
            name="table_id"
            onChange={handleUpdate}
            required={true}
            >
                <option>Select a Seat</option>
                {choices}
          </select>
        </div>

        {/* Submit / Cancel */}
        <button
          type="button"
          className="btn btn-danger mr-2"
          onClick={() => history.goBack()}
        >
          <span className="oi oitrash mr-2" />
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