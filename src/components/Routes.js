import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";

import LoginPage from "./LoginPage";

import HomePage from "./HomePage";

import Dashboard from "./Admin/Dashboard";
import AdminLoginPage from "./Admin/AdminLoginPage";
import AdminHome from "./Admin/AdminHome";
import AdminOrders from "./Admin/AdminOrders";
// import AdminManageMenu from './Admin/AdminManageMenu';

import Menu from "./Menu";
import Cart from "./Cart";
import Checkout from "./Checkout";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

export default function() {
	return (
		<Router>
			<Switch>
				<Route path="/login" component={LoginPage} />
				<Route path="/admin/login" component={AdminLoginPage} />
				<Route path="/admin">
					<Dashboard>
						<Switch>
							<Route
								path="/admin/customer-orders"
								component={AdminOrders}
							/>
							<Route path="/" component={AdminHome} />
						</Switch>
						{/*<Route path="/manage-menu" component={AdminManageMenu} />*/}
					</Dashboard>
				</Route>
				<Route path="/">
					<App>
						<Switch>
							<Route exact path="/" component={HomePage} />

							<Route exact path="/menu" component={Menu} />

							<Route exact path="/cart" component={Cart} />

							<Route
								exact
								path="/checkout"
								component={Checkout}
							/>
						</Switch>
					</App>
				</Route>
			</Switch>
		</Router>
	);
}
