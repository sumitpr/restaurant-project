import {
	FETCH_ORDERS_REQUEST,
	FETCH_ORDERS_SUCCESS,
	FETCH_ORDERS_FAILURE,
} from "../actionTypes";

import axios from 'axios';

import ordersApi from "../../../apis/ordersApi";

export function fetchOrdersRequest() {
	return {
		type: FETCH_ORDERS_REQUEST,
	};
}

export function fetchOrdersSuccess(orders) {
	return {
		type: FETCH_ORDERS_SUCCESS,
		payload: orders,
	};
}

export function fetchOrdersFailure(error) {
	return {
		type: FETCH_ORDERS_FAILURE,
		payload: error,
	};
}

export function fetchOrders(custId = null) {
	return (dispatch) => {
		dispatch(fetchOrdersRequest());
		let url = "";
		if(custId) {
			url = `http://localhost/restaurant-project/api/orders/?custId=${custId}`
		} else {
			url = "http://localhost/restaurant-project/api/orders/"
		}
		axios
			.get(url)
			.then((response) => {
				const orders = response.data;
				dispatch(fetchOrdersSuccess(orders));
			})
			.catch((e) => {
				const error = e.message;
				dispatch(fetchOrdersFailure(error));
			});
	};
}