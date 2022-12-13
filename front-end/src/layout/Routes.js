import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";

import Dashboard from "../dashboard/Dashboard";
import ReservationsAdd from "../reservations/ReservationAdd";
import ReservationUpdate from "../reservations/ReservationUpdate";
import RSearchForm from "../reservations/RSearchForm";
import SeatComp from "../seat/SeatComp";
import TableForm from "../tables/TableForm";

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
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route path="/reservations/new">
        <ReservationsAdd />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatComp />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <ReservationUpdate />
      </Route>
      <Route path="/tables/new">
        <TableForm />
      </Route>
      <Route path="/search">
        <RSearchForm />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
