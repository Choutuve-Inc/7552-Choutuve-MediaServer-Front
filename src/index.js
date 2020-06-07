import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.jsx";
import LogIn from "components/LogIn/LogIn"

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin/dashboard" render={props => <AdminLayout {...props} />} />
      <Route path="/admin" render={props => <LogIn {...props}/>} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
