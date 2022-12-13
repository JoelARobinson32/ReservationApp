import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";

import Layout from "./layout/Layout";
import "./layout/Layout.css";

function App() {
document.body.style.backgroundColor = "#6D877E"
  return (
    <Switch>
      <HashRouter>
        <Route path="/">
          <Layout />
        </Route>
      </HashRouter>
    </Switch>
  );
}

export default App;
