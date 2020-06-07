import { PLACE_ORDER_SUCCESS } from "./actionTypes";
import axios from "axios";

// Checkout
export function checkout(orderDetails) {
	return async (dispatch) => {
		try {
			axios({
				method: "post",
				url: "http://localhost/restaurant-project/api/order/",
				headers: { "content-type": "application/json" },
				data: orderDetails,
			})
				.then(response => {
					console.log(response);
					document.write(response.data);
				})
				.catch(function(error) {
					console.log(error);
				});
		} catch (e) {
			console.log(e.message);
		}
		dispatch(placeOrderSuccess(orderDetails));
	};
}


export function placeOrder(orderDetails) {
	return async (dispatch) => {
		try {
			/*axios
				.post("http://localhost/restaurant-project/api/orders/", {
					orderDetails,
					{
						headers: {'X-Custom-Header': 'value'}
					}
				})
				.then((response) => {
					console.log(response.data);
				});*/
			/*const response = await fetch(
				"http://localhost/restaurant-project/api/orders",
				{
					method: "POST",
					mode: "no-cors",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ a: 5, b: "Textual content" }),
				}
			);*/

			axios({
				method: "post",
				url: "http://localhost/restaurant-project/api/orders/",
				headers: { "content-type": "application/json" },
				data: orderDetails,
			})
				.then(response => {
					console.log(response);
				})
				.catch(function(error) {
					console.log(error);
				});
		} catch (e) {
			console.log(e.message);
		}
		dispatch(placeOrderSuccess(orderDetails));
	};
}

export function placeOrderSuccess(orderDetails) {
	return {
		type: PLACE_ORDER_SUCCESS,
		payload: orderDetails,
	};
}
