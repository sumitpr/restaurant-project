import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../../../redux/actions/admin/adminActions.js";
// import { fetchBlogs } from "../../redux/actions/blogActions.js";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";

import "./HomePage.css";

function HomePage(props) {
	console.log(props);
/*	const renderCards = () => {
		if (props.users.users.length > 0 && props.blogs.blogs.length > 0) {
			return (
				<CardDeck>
					<Card border="info" style={{ width: "18rem" }}>
						<Card.Header>Users</Card.Header>
						<Card.Body>
							<Card.Text>{props.users.users.length}</Card.Text>
						</Card.Body>
					</Card>
					<Card border="info" style={{ width: "18rem" }}>
						<Card.Header>Blogs</Card.Header>
						<Card.Body>
							<Card.Text>{props.blogs.blogs.length}</Card.Text>
						</Card.Body>
					</Card>
				</CardDeck>
			);
		} else {
			return "Loading...";
		}
	};

	useEffect(() => {
		document.title = "Home";
		props.dispatch(fetchUsers());
	}, [props.dispatch]);

	useEffect(() => {
		props.dispatch(fetchBlogs());
	}, [props.dispatch]);*/

	return (
		<Row className="HomePage justify-content-center">
			<Col xs={12} className="header">
				<h3>Welcome back!</h3>
			</Col>
		</Row>
	);
}

/*function mapStateToProps(state) {
	return {
		users: state.users,
		blogs: state.blogs,
	};
}*/

/*export default connect(
	mapStateToProps,
	null
)(HomePage);*/

export default HomePage;