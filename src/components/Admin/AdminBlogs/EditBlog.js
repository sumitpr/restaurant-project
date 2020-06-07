import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { fetchBlog, editBlog } from "../../redux/actions/blogActions";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function EditBlog({ dispatch, blog, match, history }) {
	const [formValues, setFormValues] = useState({ title: "", body: "" });
	const [success, setSuccess] = useState(false);
	const id = parseInt(match.params.id);

	const handleInputChange = (e) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(editBlog(id, formValues));
		setSuccess(true);
		setTimeout(() => {
			setSuccess(false);
			history.push("/blogs");
		}, 1000);
	};

	useEffect(() => {
		dispatch(fetchBlog(id));
	}, [id]);

	useEffect(() => {
		if (blog) {
			setFormValues({
				title: blog ? blog.title : "",
				body: blog ? blog.body : "",
			});
		}
	}, [blog]);

	return (
		<Row className="EditBlog justify-content-center align-items-center text-center">
			<Col xs="10" lg="8" className="p-3">
				<h2>Edit blog</h2>

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
				{success && <div>Saved!</div>}
			</Col>
		</Row>
	);
}

function mapStateToProps(state) {
	return {
		blog: state.blogs.currentBlog,
	};
}

export default connect(mapStateToProps)(withRouter(EditBlog));
