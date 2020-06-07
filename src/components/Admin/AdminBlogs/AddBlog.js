import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { addBlog } from "../../redux/actions/blogActions";
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AddBlog(props) {
	const [formValues, setFormValues] = useState({ title: "", body: "" });
	const [success, setSuccess] = useState(false);

	const handleInputChange = (e) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const id = Math.round(Math.random() * 1000);
		await props.dispatch(
			addBlog({
				id,
				title: formValues.title,
				body: formValues.body,
			})
		);

		setFormValues({ title: "", body: "" });
		setSuccess(true);
		setTimeout(() => {
			setSuccess(false);
			props.history.push("/blogs");
		}, 2000);
	};

	return (
		<Row className="AddBlog justify-content-center align-items-center text-center">
			<Col xs="10" lg="8" className="p-3">
				<h2>Add blog</h2>

				<Link to="/blogs">
					<Button variant="primary" className="m-2">
						Back
					</Button>
				</Link>

				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="formTitle">
						<Form.Control
							type="text"
							name="title"
							placeholder="Title"
							value={formValues.title || ""}
							onChange={handleInputChange}
						/>
					</Form.Group>

					<Form.Group controlId="formBody">
						<Form.Control
							name="body"
							as="textarea"
							placeholder="Body"
							value={formValues.body || ""}
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
		blogs: state.blogs.blogs,
	};
}

export default connect(mapStateToProps)(withRouter(AddBlog));
