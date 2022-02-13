import React from "react";

import { Main } from "./loadable";
import { Router, Redirect, Route, Switch } from "react-router-dom";

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/app" component={Main} />
      <Route exact path="/" component={() => <Redirect to="/app" />} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </Router>
);

export default AppRouter;
