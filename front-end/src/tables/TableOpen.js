import React from "react";

// Defines the table options for use in the Seats component.

export default function TableOpen({ table }) {
  return (
    <option value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  );
}