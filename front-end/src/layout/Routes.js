import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { today } from "../utils/date-time";

import Dashboard from "../dashboard/Dashboard";
import ReservationAdd from "../reservations/ReservationAdd";
import ReservationSearch from "../reservations/ReservationSearch";
import ReservationUpdate from "../reservations/ReservationUpdate";
import TableAdd from "../tables/TableAdd";
import Seat from "../seat/Seat";
import SeatForm from "../seat/SeatForm";
import NotFound from "./NotFound";


// Route handler
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route exact={true} path="/search">
        <ReservationSearch />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <ReservationAdd />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/edit">
        <ReservationUpdate />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <Seat />
      </Route>
      <Route exact={true} path="/tables">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/tables/new">
        <TableAdd />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;