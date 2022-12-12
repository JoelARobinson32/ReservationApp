import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { updateReservationStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

import "./ReservationsStyle.css";

function ReservationsList({ reservation }) {
    const history = useHistory();
    const [error, setError] = useState('');

    const handleSeat = () => history.push(`/reservations/${reservation.reservation_id}/seat`);
    const handleEdit = () => history.push(`/reservations/${reservation.reservation_id}/edit`);
    const handleCancel = async (event) => {
        event.preventDefault();

        if (window.confirm('Permanently Cancel Reservation?')) {
            const abortController = new AbortController();
            updateReservationStatus({ ...reservation, status: "cancelled" }, abortController.signal)
                .then(() => { window.location.reload() })
                .catch(err => setError(err));
        }
    };

    return (
        <div className="card entry border-secondary my-1">
            <div className="card-header text-white">
                <h5> 
                    <span className="oi oi-person mr-2 mt-2"></span>
                    {reservation.first_name} {reservation.last_name} 
                </h5>
            </div>
            <div className="card-body">
                <span className="oi oi-people mr-2"></span>
                Party Size: {reservation.people} <br />
                <span className="oi oi-phone mr-2"></span>
                Contact: {reservation.mobile_number} <br />
                <span className="oi oi-calendar mr-2"></span>
                Date: {reservation.reservation_date} <br />
                <span className="oi oi-clock mr-2"></span>
                Time: {reservation.reservation_time} <br />
                <span className="oi oi-chevron-right mr-2"></span>
                Status: {reservation.status} <br />

            <button 
                data-reservation-id-cancel={reservation.reservation_id} 
                type="button" 
                className="btn btn-danger mr-2 mt-2"
                onClick={handleCancel}>
                    <span className="oi oi-trash mr-2" />
                    Cancel
            </button>

            <button 
                href={`/reservations/${reservation.reservation_id}/edit`} 
                type="button" 
                className="btn btn-warning mr-2 mt-2"
                onClick={handleEdit}>
                    <span className="oi oi-pencil mr-2" />
                    Edit
            </button>

            {reservation.status === "booked" ?
                <button 
                    href={`/reservations/${reservation.reservation_id}/seat`} 
                    type="button" 
                    className="btn btn-warning mr-2 mt-2"
                    onClick={handleSeat}>
                        <span className="oi oi-check mr-2" />
                        Seat
                </button>
            : ""}

            <ErrorAlert error={error} />
            </div>
        </div>
    );
}

export default ReservationsList