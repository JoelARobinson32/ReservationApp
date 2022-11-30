import React from "react";
import Reservation from "./Reservation";

// Lists reservations, either all or only active reservations.
export default function ReservationList({ reservations, resActive }) {
  if (resActive) {
    const ReservationList = reservations.map((reservation) => {
      return (
        <Reservation
          key={reservation.reservation_id}
          reservation={reservation}
        />
      );
    });
    return 
        <div>
            {ReservationList}
        </div>;
  } else {
    const ReservationList = reservations.filter((reservation) => {
        return reservation.status !== "cancelled";
      })
      .map((reservation) => {
        return (
          <Reservation
            reservation={reservation}
            key={reservation.reservation_id}
          />
        );
      });
    return 
        <div>
            {ReservationList}
        </div>;
  }
}