import React from "react";
import SeatForm from "./SeatForm";

// Choose Seat
export default function SeatComp() {
  return (
    <div>
      <h2 className="mb-2 mt-2">Select Table</h2>
      <SeatForm />
    </div>
  );
}