import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUsers } from "../../redux/actions/userActions";

import UserItem from "./UserItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./Users.css";

function Users({ dispatch, users }) {
	const renderUsers = (users) => {
		return users.map(function(user) {
			return <UserItem key={user.id} user={user} />;
		});
	};

	useEffect(() => {
		document.title = "Users";
		dispatch(fetchUsers());
	}, []);

	if (users.users.length < 1 || users.loading) {
		return <Col>Loading...</Col>;
	}
	return (
		<Row>
			<Col>
				<Link to="/users/add">
					<Button variant="primary">Add user</Button>
				</Link>
				{renderUsers(users.users)}
			</Col>
		</Row>
	);
}

function mapStateToProps(state) {
	return {
		users: state.users,
	};
}

export default connect(mapStateToProps)(Users);
