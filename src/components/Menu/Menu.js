import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchMenu } from "../../redux/actions/menuActions";
import { logOut } from "../../redux/actions/authenticationActions";

import MenuItem from "../MenuItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import cartIcon from "../../images/carticon.png";
import "./Menu.css";

function Menu({ dispatch, menu }) {
	const renderMenu = (menuItems) => {
		return menuItems.map(function(item) {
			return <MenuItem key={item.id} item={item} />;
		});
	};

	useEffect(() => {
		document.title = "Menu";
		if (menu.menuItems.length < 1) {
			dispatch(fetchMenu());
		}
	}, []);

	if (menu.menuItems.length < 1 || menu.loading) {
		return <Col>Loading...</Col>;
	}
	return (
		<Row className="Menu px-2">
			<Col>
				<Row className="justify-content-between align-items-center">
					<div>
						<Link to="/">
							<Button>Back</Button>
						</Link>
						<Button onClick={() => dispatch(logOut())}>
							Logout
						</Button>
					</div>
					<div>
						<Link to="/cart">
							<span className="cart-icon-container">
								<img
									className="cart-icon img-fluid"
									src={cartIcon}
								/>
								<span className="cart-icon-text">Cart</span>
							</span>
						</Link>
					</div>
				</Row>
				<Row>
					<Col className="my-2">
						<h3>Build your order</h3>
					</Col>
				</Row>
				<Col xs={10} md={6} className="menu-items-container">
					<Row className="mt-2 justify-content-center">
						{renderMenu(menu.menuItems)}
					</Row>
				</Col>
			</Col>
		</Row>
	);
}

function mapStateToProps(state) {
	return {
		menu: state.menu,
	};
}

export default connect(mapStateToProps)(Menu);
