import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { emptyTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

import "./TableStyle.css";

function TablesList({ table }) {
    const history = useHistory();
    const [error, setError] = useState('');

    const handleFinishClick = async event => {
    event.preventDefault();

    if (window.confirm('Permanently Clear Table?')) {
        const abortController = new AbortController();
        emptyTable(table.table_id, abortController.signal)
            .then(() => { history.go(0); })
            .catch(err => setError(err));
        }
    };

    return (
        <div className="card entry border-secondary my-1">
            <div className="card-header text-white">
                <h5>
                    {table.table_name}
                </h5>

            </div>
                <div className="card-body">
                    <ErrorAlert error={error} />
                    <span className="oi oi-people mr-2"></span>
                    {table.capacity} <br />
                    <span data-table-id-status={`${table.table_id}`}>
                        <span className="oi oi-chevron-right mr-2 mb-2"></span>
                        Status: {table.is_seated ? 'occupied' : 'open'}
                    </span>
                    <br />

                    <div className="text-center">
                        <button
                          className="btn btn-sm btn-danger"
                          data-table-id-finish={table.table_id}
                          onClick={handleFinishClick}
                        >
                          <span className="oi oi-check mr-2" />
                          Finish
                        </button>
                    </div>
            </div>
        </div>
    );
}

export default TablesList;