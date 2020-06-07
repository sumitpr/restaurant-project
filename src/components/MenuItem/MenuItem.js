import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { addToCart } from "../../redux/actions/cartActions";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./MenuItem.css";

function MenuItem({ dispatch, item, cartItems, location }) {
	const isInCart = (id) => {
		let flag = false;
		cartItems.forEach((item) => {
			if (item.id === id) {
				flag = true;
				return;
			}
		});
		return flag;
	};

	return (
		<Col xs={6} lg={6}>
			<div className="MenuItem">
				<div className="MenuItem-image-container">
					<img src={item.image} className="img-fluid" />
				</div>
				<div className="MenuItem-details">
					<div className="MenuItem-details-title">
						{item.item_name}
					</div>
					<Button
						size="sm"
						disabled={isInCart(item.id)}
						onClick={() => {
							dispatch(addToCart(item));
						}}
					>
						Add +
					</Button>
				</div>
			</div>
		</Col>
	);
}

function mapStateToProps(state) {
	return {
		cartItems: state.cart.cartItems,
	};
}

export default connect(mapStateToProps)(withRouter(MenuItem));
