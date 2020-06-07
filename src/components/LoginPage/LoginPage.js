import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ToastContainer, toast } from "react-toastify";

import {
	logIn,
	checkAuthentication,
	authenticationFailure,
	authenticationRetry,
} from "../../redux/actions/authenticationActions";

// username: Ervin Howell
// password: Antonette

function LoginPage(props) {
	const [formValues, setFormValues] = useState({
		username: "",
		password: "",
	});

	const handleInputChange = (e) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formValues.username || !formValues.password) {
			props.dispatch(authenticationFailure("Fill all fields correctly"));
			return;
		} else {
			props.dispatch(logIn(formValues.username, formValues.password));
			return;
		}
	};

	const displayError = async () => {
		await toast.error(props.authentication.error);
		props.dispatch(authenticationRetry());
	};

	useEffect(() => {
		document.title = "Restaurant - Login";
		props.dispatch(checkAuthentication());
	}, []);

	if (props.authentication.isLogged) {
		return <Redirect to="/" />;
	}

	if (props.authentication.error) {
		displayError();
	}

	return (
		<Row className="LoginPage justify-content-center align-items-center text-center">
			<Col xs="8" lg="4" className="p-3">
				<h2>Login</h2>
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="formBasicEmail">
						<Form.Control
							type="text"
							name="username"
							placeholder="Username"
							value={formValues.username || ""}
							onChange={handleInputChange}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Control
							name="password"
							type="password"
							placeholder="Password"
							value={formValues.password || ""}
							onChange={handleInputChange}
						/>
					</Form.Group>

					<Button
						variant="primary"
						type="submit"
						disabled={props.authentication.loading}
					>
						Login
					</Button>
				</Form>
			</Col>
			<ToastContainer autoClose={2000} hideProgressBar />
			{/*<h2>Login</h2>
			<form onSubmit={handleSubmit} className="form login-form">
				<input
					type="text"
					name="username"
					placeholder="username"
					value={formValues.username || ""}
					onChange={handleInputChange}
				/>
				<input
					type="password"
					name="password"
					placeholder="password"
					value={formValues.password || ""}
					onChange={handleInputChange}
				/>
				<input
					type="submit"
					className="btn"
					name="submit"
					value="login"
				/>
			</form>
			{props.authentication.loading && "loading..."}
			<ToastContainer autoClose={2000} hideProgressBar />*/}
		</Row>
	);
}

function mapStateToProps(state) {
	return {
		authentication: state.authentication,
	};
}

export default connect(mapStateToProps)(LoginPage);
