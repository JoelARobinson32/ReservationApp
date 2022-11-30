import React from "react";
import ReservationForm from "./ReservationForm";

// Add a reservation.

export default function ReservationAdd() {
  return (
    <div>
      <h2 className="mb-2 mt-2">New Reservation</h2>
      <ReservationForm />
    </div>
  );
}