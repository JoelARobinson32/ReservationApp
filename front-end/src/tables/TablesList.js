import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { emptyTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

import "./TableStyle.css";

function TablesList({ table }) {
    const history = useHistory();
    const [error, setError] = useState('');

    const handleFinish = async event => {
        event.preventDefault();

        if (window.confirm('Is this table ready to seat new guests? This cannot be undone.')) {
            const abortController = new AbortController();
            emptyTable(table.table_id)
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
                    <span className="oi oi-people mr-2"></span>
                    {table.capacity} <br />
                    <span data-table-id-status={`${table.table_id}`}>
                        <span className="oi oi-chevron-right mr-2"></span>
                        Status: {table.is_seated ? 'occupied' : 'open'}
                    </span>
                    <br />

                    <button 
                    data-table-id-finish={table.table_id}
                    type='button' 
                    className="btn btn-warning mr-2 mt-2"
                    onClick={handleFinish}>
                        <span className="oi oi-check mr-2" />
                        Finish
                    </button>

                    <ErrorAlert error={error} />
            </div>
        </div>
    );
}

export default TablesList;