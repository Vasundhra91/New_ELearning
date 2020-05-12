import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
//import { Router, Route, Switch, Redirect } from "react-router-dom";
import {UserContextProvider} from '../src/views/Logincontext'
import "../node_modules1/bootstrap/dist/css/bootstrap.css";
import "../node_modules1/assets/scss/paper-dashboard.scss?v=1.1.0";
import "../node_modules1/assets/demo/demo.css";
import "../node_modules1/perfect-scrollbar/css/perfect-scrollbar.css";

//import AdminLayout from "layouts/Admin.jsx";
import Home from "../node_modules1/views/login";
const hist = createBrowserHistory();

ReactDOM.render(<UserContextProvider><Home/></UserContextProvider>,document.getElementById("root")
);
