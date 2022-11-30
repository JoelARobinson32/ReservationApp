import React from "react";
import Table from "./Table";

//List the tables. Will throw an error if no database is connected.
export default function TableList({ tables }) {
  const TableList = tables.map((table) => {
    return <Table key={table.table_id} table={table} />;
  });

  return (
    <div className="d-flex flex-wrap justify-content-around">{TableList}</div>
  )
}