import React from "react";
import { HashRouter as Router, Link, Switch, Route } from "react-router-dom";
import Explore from "../Explore";

const Routes = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/explore?start=0&limit=10">Explore</Link>
        </li>
      </ul>
    </div>
    <Switch>
      <Route exact path="/">
        Home
      </Route>
      <Route path="/explore">
        <Explore />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
