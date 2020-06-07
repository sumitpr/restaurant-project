import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { fetchUser, editUser } from "../../redux/actions/userActions";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function EditUser({ user, dispatch, match, history }) {
	const [formValues, setFormValues] = useState({ name: "", email: "" });
	const [success, setSuccess] = useState(false);
	const id = parseInt(match.params.id);

	const handleInputChange = (e) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await dispatch(editUser(id, formValues));
		setSuccess(true);
		setTimeout(() => {
			setSuccess(false);
			history.push("/users");
		}, 1000);
	};

	useEffect(() => {
		dispatch(fetchUser(id));
	}, [id]);

	useEffect(() => {
		setFormValues({
			name: user ? user.name : "",
			email: user ? user.email : "",
		});
	}, [user]);

	return (
		<Row className="EditUser justify-content-center align-items-center text-center">
			<Col xs="10" lg="8" className="p-3">
				<h2>Edit user</h2>

				<Link to="/users">
					<Button variant="primary" className="m-2">
						Back
					</Button>
				</Link>

				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="formUserName">
						<Form.Control
							type="text"
							name="name"
							placeholder="Name"
							value={formValues.name || ""}
							onChange={handleInputChange}
						/>
					</Form.Group>
					<Form.Group controlId="formEmail">
						<Form.Control
							type="email"
							name="email"
							placeholder="Email"
							value={formValues.email || ""}
							onChange={handleInputChange}
						/>
					</Form.Group>

					<Button variant="primary" type="submit">
						Save
					</Button>
				</Form>
				{success && <div>Saved!</div>}
			</Col>
		</Row>
	);
}

function mapStateToProps(state) {
	return {
		user: state.users.currentUser,
	};
}

export default connect(mapStateToProps)(withRouter(EditUser));
