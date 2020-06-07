import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import Button from 'react-bootstrap/Button';

// import { deleteBlog } from "../../redux/actions/blogActions";

function BlogItem({ dispatch, blog, location }) {
	return (
		<div className="BlogItem">
			<div className="BlogItem-title">{blog.title}</div>
			<div className="BlogItem-operations-wrapper">
				<Link to={`${location.pathname}/${blog.id}`}>
					<Button variant="primary" size="sm">View</Button>
				</Link>
				<Link to={`${location.pathname}/edit/${blog.id}`}>
					<Button variant="primary" size="sm">Edit</Button>
				</Link>
				{/*<button
					className="btn"
					onClick={() => dispatch(deleteBlog(blog.id))}
				>
					Delete
				</button>*/}
			</div>
		</div>
	);
}

export default connect(
	null,
	null
)(withRouter(BlogItem));
