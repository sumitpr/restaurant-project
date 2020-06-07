import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUser } from "../../redux/actions/userActions";
import { deleteUser } from "../../redux/actions/userActions";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import ConfirmDialog from "../ConfirmDialog";

import "react-toastify/dist/ReactToastify.css";
import "./Users.css";

function UserDetail({ users, fetchUser, deleteUser, match, history }) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

	const id = parseInt(match.params.id);

	const handleDelete = () => {
		deleteUser(id);
		toggleDialog();
		toast.success("Deleted!");
		setTimeout(() => {
			history.push("/users");
		}, 1000);
	};

	const renderUser = (user) => {
		if (user) {
			return (
				<Col>
					<div>{user.name}</div>
					<div>{user.email}</div>
				</Col>
			);
		}
	};

	useEffect(() => {
		fetchUser(id);
	}, [id]);

	if (users.loading || !users.currentUser) {
		return <div>Loading...</div>;
	}
	return (
		<Row className="UserDetail">
			<Col>
				<Link to="/users">
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

				{renderUser(users.currentUser)}

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
		fetchUser: (id) => dispatch(fetchUser(id)),
		deleteUser: (id) => dispatch(deleteUser(id)),
	};
}

function mapStateToProps(state) {
	return {
		users: state.users,
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserDetail);
