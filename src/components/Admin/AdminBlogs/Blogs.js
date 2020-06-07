import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBlogs } from "../../redux/actions/blogActions";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import BlogItem from "./BlogItem";
import "./Blogs.css";

function Blogs({ dispatch, blogs }) {
	const renderBlogs = (blogs) => {
		return blogs.map(function(blog) {
			return <BlogItem key={blog.id} blog={blog} />;
		});
	};

	useEffect(() => {
		document.title = "Blogs";
		dispatch(fetchBlogs());
	}, []);

	if (blogs.blogs.length < 1 || blogs.loading) {
		return <div>Loading...</div>;
	}

	return (
		<Row>
			<Col>
				<Link to="/blogs/add">
					<Button variant="primary">Add blog</Button>
				</Link>
				{renderBlogs(blogs.blogs)}
			</Col>
		</Row>
	);
}

function mapStateToProps(state) {
	return {
		blogs: state.blogs,
	};
}

export default connect(mapStateToProps)(Blogs);
