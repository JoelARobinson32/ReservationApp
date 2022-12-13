import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";

import { today } from "../utils/date-time";

import Dashboard from "../dashboard/Dashboard";
import ReservationsAdd from "../reservations/ReservationAdd";
import ReservationUpdate from "../reservations/ReservationUpdate";
import ReservationSearch from "../reservations/ReservationSearch";
import SeatComp from "../seat/SeatComp";
import TableAdd from "../tables/TableAdd";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
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
        <ReservationsAdd />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/edit">
        <ReservationUpdate />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <SeatComp />
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
