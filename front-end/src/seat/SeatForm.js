import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { listTables, seatTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

import TableOpen from "../tables/TableOpen";

function Seat() {
    const { reservation_id } = useParams();
    const [tables, setTables] = useState([]);
    const history = useHistory();
    const [error, setError] = useState('');

    function loadTables() {
        const abortController = new AbortController();
        setError(null);
        listTables(abortController.signal)
            .then(setTables)
            .catch(setError);
        return () => abortController.abort();
    }
    useEffect(loadTables, []);

    var e = document.getElementsByName("table_id")[0];
    const handleSubmit = async (event) => {
        event.preventDefault();

        const abortController = new AbortController();
        seatTable(e.options[e.selectedIndex].value, Number(reservation_id), abortController.signal)
            .then(() => history.push(`/dashboard`))
            .catch(setError);
    };
    const handleCancel = () => history.go(-1);

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
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <span className="oi oi-chevron-right mr-2"></span>
                      Seat Choice:
                    </span>
                </div>
                <label className="sr-only" htmlFor="table_id">
                  Select a Table:
                </label>
              <select className="form-control" 
                name="table_id"
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

export default Seat;