import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function UserItem({ dispatch, user, location }) {
	return (
		<Col className="UserItem mx-auto" lg={11}>
			<div className="UserItem-title">{user.name}</div>
			<div className="UserItem-email">{user.email}</div>
			<div className="UserItem-operations-wrapper">
				<Link to={`${location.pathname}/${user.id}`}>
					<Button variant="primary">View</Button>
				</Link>
				<Link to={`${location.pathname}/edit/${user.id}`}>
					<Button variant="primary">Edit</Button>
				</Link>
{/*				<Button
					variant="primary"
					onClick={() => dispatch(deleteUser(user.id))}
				>
					Delete
				</Button>*/}
			</div>
		</Col>
	);
}

export default connect(
	null,
	null
)(withRouter(UserItem));
