import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
	increaseQty,
	decreaseQty,
	deleteCartItem,
} from "../../redux/actions/cartActions";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import "./Cart.css";

function Cart({ dispatch, cart }) {
	const renderCart = (cartItems) => {
		return cartItems.map(function(item) {
			return (
				<tr key={item.id}>
					<td>{item.item_name}</td>
					<td>{item.qty}</td>
					<td>
						<Button
							size="sm"
							onClick={() => {
								item.qty === 1
									? dispatch(deleteCartItem(item.id))
									: dispatch(decreaseQty(item.id));
							}}
						>
							-
						</Button>
						<Button
							size="sm"
							onClick={() => dispatch(increaseQty(item.id))}
						>
							+
						</Button>
					</td>
					<td>{item.qty * parseInt(item.item_price)}</td>
				</tr>
			);
		});
	};

	const calculateTotal = (items) => {
		const total = items.reduce(
			(total, item) => total + parseInt(item.item_price) * item.qty,
			0
		);
		return total;
	};

	useEffect(() => {
		document.title = "Cart";
	}, []);

	if (cart.cartItems.length < 1) {
		return (
			<Col>
				<div>Add some items</div>
				<Link to="/menu">
					<Button>See menu</Button>
				</Link>
			</Col>
		);
	}
	return (
		<div className="Cart">
			<Col xs={12}>
				<Link to="/menu">
					<Button>Back</Button>
				</Link>
			</Col>
			<Col xs={12} className="my-3">
				<h4>Cart</h4>
			</Col>
			<Col className="p-3">
				<Table responsive className="Cart-table">
					<tbody>
						{renderCart(cart.cartItems)}
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td>{`₹ ${calculateTotal(cart.cartItems)}`}</td>
						</tr>
					</tbody>
				</Table>
			</Col>
			<Col xs={12}>
				<Link to="/checkout">
					<Button>Checkout</Button>
				</Link>
			</Col>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		cart: state.cart,
	};
}

export default connect(mapStateToProps)(Cart);
