import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchBlog } from "../../redux/actions/blogActions";
import { deleteBlog } from "../../redux/actions/blogActions";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import ConfirmDialog from "../ConfirmDialog";

import "react-toastify/dist/ReactToastify.css";
import "./Blogs.css";

function BlogDetail({ blogs, fetchBlog, deleteBlog, match, history }) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

	const id = parseInt(match.params.id);

	const handleDelete = () => {
		deleteBlog(id);
		toggleDialog();
		toast.success("Deleted!");
		setTimeout(() => {
			history.push("/blogs");
		}, 1000);
	};

	const renderBlog = (blog) => {
		if (blog) {
			return (
				<Col>
					<h3 className="BlogDetail-title">{blog.title}</h3>
					<div className="BlogDetail-body">{blog.body}</div>
				</Col>
			);
		}
	};

	useEffect(() => {
		fetchBlog(id);
	}, [id]);

	if (blogs.loading || !blogs.currentBlog) {
		return <div>Loading...</div>;
	}
	return (
		<Row className="BlogDetail">
			<Col>
				<Link to="/blogs">
					<Button variant="primary">Back</Button>
				</Link>
				<Button
					variant="danger"
					onClick={() => {
						toggleDialog();
					}}
				>
					Delete
				</Button>

				{renderBlog(blogs.currentBlog)}

				{isDialogOpen && (
					<ConfirmDialog
						onConfirm={handleDelete}
						onCancel={toggleDialog}
					>
						Delete?
					</ConfirmDialog>
				)}

				<ToastContainer autoClose={2000} hideProgressBar />
			</Col>
		</Row>
	);
}

function mapDispatchToProps(dispatch) {
	return {
		fetchBlog: (id) => dispatch(fetchBlog(id)),
		deleteBlog: (id) => dispatch(deleteBlog(id)),
	};
}

function mapStateToProps(state) {
	return {
		blogs: state.blogs,
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BlogDetail);
