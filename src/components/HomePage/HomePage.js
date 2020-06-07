import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchOrders } from "../../redux/actions/admin/adminActions.js";

import BootstrapTable from "react-bootstrap-table-next";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";

import heroimg from "../../images/heroimg.jpg";

import "./HomePage.css";

const sectionStyles = {
	backgroundImage: `url(${heroimg})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover",
	backgroundPosition: "center center",
	minHeight: "100vh",
};

function HomePage(props) {
	const dispatch = useDispatch();
	const orders = useSelector((state) => state.admin.orders);

	console.log(orders);
	const columns = [
		{
			dataField: "orderId",
			text: "Order ID",
		},
		{
			dataField: "cname",
			text: "Customer name",
		},
		{
			dataField: "orderItems",
			text: "Order items",
			formatter: (cell, row) => {
				return JSON.parse(cell).map((item, idx) => {
					return (
						<div key={idx}>
							<span>Item: {item.item_name}</span>&nbsp;
							<span>Quantity: {item.qty}</span>
						</div>
					);
				});
			},
		},
	];

	useEffect(() => {
		dispatch(fetchOrders(parseInt(localStorage.getItem("userId"))));
	}, []);

	return (
		<div className="HomePage justify-content-center">
			<Col
				xs={12}
				className="HomePage-hero-container"
				style={sectionStyles}
			>
				<div className="HomePage-nav">
					<Link to="/menu">Menu</Link>
				</div>

				{orders.orders.length > 0 && (
					<div className="customer-order-status-container">
						<BootstrapTable
							keyField="orderId"
							data={orders.orders}
							columns={columns}
						/>
					</div>
				)}
			</Col>
		</div>
	);
}

export default HomePage;
