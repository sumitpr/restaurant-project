import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { addUser } from "../../redux/actions/userActions";
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AddUser(props) {
	const [formValues, setFormValues] = useState({ name: "", email: "" });
	const [success, setSuccess] = useState(false);

	const handleInputChange = (e) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await props.dispatch(
			addUser({
				name: formValues.name,
				email: formValues.email,
			})
		);

		setFormValues({ name: "", email: "" });
		setSuccess(true);
		setTimeout(() => {
			setSuccess(false);
			props.history.push("/users");
		}, 2000);
	};

	return (
		<Row className="AddUser justify-content-center align-items-center text-center">
			<Col xs="10" lg="8" className="p-3">
				<h2>Add user</h2>

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
				{success && <div>Added!</div>}
			</Col>
		</Row>
	);
}

function mapStateToProps(state) {
	return {
		users: state.users.users,
	};
}

export default connect(mapStateToProps)(withRouter(AddUser));
