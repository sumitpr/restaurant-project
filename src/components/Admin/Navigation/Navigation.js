import React from "react";
import { withRouter, Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
// import { logOut } from "../../redux/actions/authenticationActions";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import home from '../../../images/home.png';
import blog from '../../../images/blog.png';
import user from '../../../images/user.png';

import "./Navigation.css";

function Navigation(props) {
	return (
		<Col xs={12} lg={3} className="Navigation">
			{/*Logout*/}
			{/*<Button
				variant="light"
				onClick={() => {
					props.dispatch(logOut());
				}}
			>
				logout
			</Button>
			<ul className="Header-nav-links">
				<Link to="/users">Users</Link>
				<Link to="/blogs">Blogs</Link>
			</ul>*/}

			<Navbar
				collapseOnSelect
				expand="lg"
				className="flex-column"
				variant="dark"
			>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="flex-column mr-auto p-2">
						<Button
							variant="light"
							onClick={() => {
								// props.dispatch(logOut);
							}}
							className="mb-3"
						>
							logout
						</Button>
						<NavLink exact to="/admin" activeClassName="nav-active"><img src={home} />Home</NavLink>
						<NavLink to="/admin/customer-orders" activeClassName="nav-active"><img src={user} />Orders</NavLink>
						<NavLink to="/admin/manage-menu" activeClassName="nav-active"><img src={blog} />Manage menu</NavLink>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Col>
	);
}

export default connect()(withRouter(Navigation));
