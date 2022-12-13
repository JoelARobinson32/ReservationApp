import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { axios } from "axios";

import { formatAsDate } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";

import ReservationForm from "./ReservationForm";

// Allows you to update existing reservations

export default function ReservationUpdate() {
  const URL = "https://reservationappbyjoelbackend.onrender.com";
  const [resExists, setResExists] = useState(null);
  const [error, setError] = useState(null);

  const { reservation_id } = useParams();

  // Find an existing reservation
  useEffect(() => {
    const abortController = new AbortController();
    axios
      .get(`${URL}/reservations/${reservation_id}`, {
        signal: abortController.signal,
      })
      .then((response) =>
        setResExists({
          ...response.data.data,
          reservation_date: formatAsDate(response.data.data.reservation_date),
        })
      )
      .catch(setError);
    return () => abortController.abort();
  }, [URL, reservation_id]);

  // Open reservation with edit set to true.
  return (
    <div>
      <h2 className="mb-2 mt-3">Update Reservation</h2>
      <ErrorAlert error={error} />
      {resExists && (
        <ReservationForm resExists={resExists} edit={true}/>
      )}
    </div>
  );
}