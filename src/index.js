import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import NotFound from "views/Result/404"
import Login from "views/Auth/Login";


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      {/* <Route path="/" render={props => <AuthLayout {...props} />} /> */}
      <Route path="/" component={Login} />
      <Route path="/admin/404" component={NotFound}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
