import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../redux/actions/admin/adminActions.js";
// import { fetchBlogs } from "../../redux/actions/blogActions.js";

import BootstrapTable from "react-bootstrap-table-next";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

// import "./HomePage.css";

function AdminOrders(props) {
	const dispatch = useDispatch();
	const orders = useSelector((state) => state.admin.orders);

	console.log(orders);

	useEffect(() => {
		dispatch(fetchOrders());
	}, []);

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
			dataField: "address",
			text: "Address",
		},
		{
			dataField: "orderItems",
			text: "Order items",
			formatter: (cell, row) => {
				return JSON.parse(cell).map((item, idx) => {
					return (
						<div key={idx}>
							<div>Item: {item.item_name}</div>
							<div>Quantity: {item.qty}</div>
						</div>
					);
				});
			},
		},
		{
			dataField: "orderAmt",
			text: "Order Amount",
		},
		{
			dataField: "status",
			text: "Status",
		},
		{
			dataField: 'statusOperations',
			text: 'Operation',
			isDummyField: true,
			formatter: (cell, row) => {
				return row.status === "open" ? <Button>Mark as complete</Button> : "";
			}
		}
	];

	return (
		<Row className="AdminOrders justify-content-center">
			<Col xs={12} className="header">
				<h3>Orders</h3>
			</Col>

			<Col xs={10}>
				{orders && orders.orders.length > 0 && (
					<BootstrapTable
						keyField="orderId"
						data={orders.orders}
						columns={columns}
					/>
				)}
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
)(AdminOrders);*/

export default AdminOrders;
