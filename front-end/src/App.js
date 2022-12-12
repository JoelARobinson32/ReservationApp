import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";

import Layout from "./layout/Layout";
import "./layout/Layout.css";

/**
 * Defines the root application component.
 * @returns {JSX.Element}
 */
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
