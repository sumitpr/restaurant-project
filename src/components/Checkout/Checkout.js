import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { placeOrder, checkout } from "../../redux/actions/checkoutActions";
import { clearCart } from "../../redux/actions/cartActions";
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import successTick from "../../images/successtick.png";

import "./Checkout.css";

function Checkout(props) {
	const [formValues, setFormValues] = useState({
		cname: "",
		mobile: "",
		address: "",
	});
	const [success, setSuccess] = useState(false);

	const handleInputChange = (e) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const calculateTotal = (items) => {
		const total = items.reduce(
			(total, item) => total + parseInt(item.item_price) * item.qty,
			0
		);
		return total;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const orderId = Math.round(Math.random() * 10000);
		const orderDetails = {
			customerDetails: {
				orderId,
				cname: formValues.cname,
				mobile: formValues.mobile,
				address: formValues.address,
			},
			customerId: JSON.parse(localStorage.getItem("userId")),
			items: JSON.stringify(props.cartItems),
			orderAmt: calculateTotal(props.cartItems),
			date: new Date(),
		};

		await props.dispatch(checkout(orderDetails));
		// await props.dispatch(placeOrder(orderDetails));
		// props.dispatch(clearCart());

		// setFormValues({ cname: "", mobile: "", address: "" });
		setSuccess(true);
		setTimeout(() => {
			setSuccess(false);
			// props.history.push("/");
		}, 2000);
	};

	return (
		<Row className="Checkout justify-content-center align-items-center text-center">
			<Col xs="10" lg="8" className="p-3">
				<Link to="/cart">
					<Button variant="primary" className="m-2">
						Back
					</Button>
				</Link>

				<Col xs={12} className="my-4">
					<h4>Please fill in delivery information</h4>
				</Col>

				<Form className="form" onSubmit={handleSubmit}>
					<Form.Group controlId="formCname">
						<Form.Control
							type="text"
							name="cname"
							placeholder="Name"
							value={formValues.cname || ""}
							onChange={handleInputChange}
						/>
					</Form.Group>

					<Form.Group controlId="formMobile">
						<Form.Control
							type="text"
							name="mobile"
							placeholder="Mobile"
							value={formValues.mobile || ""}
							onChange={handleInputChange}
						/>
					</Form.Group>

					<Form.Group controlId="formAddress">
						<Form.Control
							name="address"
							as="textarea"
							placeholder="Address"
							value={formValues.address || ""}
							onChange={handleInputChange}
						/>
					</Form.Group>

					<Button variant="primary" type="submit">
						Place order
					</Button>
				</Form>

				{success && (
					<div className="success-message-container">
						<img
							src={successTick}
							className="order-success-icon img-fluid"
						/>
						<div>Order successfully placed!</div>
					</div>
				)}
			</Col>
		</Row>
	);
}

function mapStateToProps(state) {
	return {
		cartItems: state.cart.cartItems,
	};
}

export default connect(
	mapStateToProps,
	null
)(withRouter(Checkout));
