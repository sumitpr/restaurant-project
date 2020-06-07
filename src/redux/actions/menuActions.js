import {
	FETCH_MENU_REQUEST,
	FETCH_MENU_SUCCESS,
	FETCH_MENU_FAILURE
} from "./actionTypes";

import usersApi from "../../apis/usersApi";

export function fetchMenuRequest() {
	return {
		type: FETCH_MENU_REQUEST
	};
}

export function fetchMenuSuccess(menuItems) {
	return {
		type: FETCH_MENU_SUCCESS,
		payload: menuItems
	};
}

export function fetchMenuFailure(error) {
	return {
		type: FETCH_MENU_FAILURE,
		payload: error
	};
}

export function fetchMenu() {
	return dispatch => {
		dispatch(fetchMenuRequest());
		usersApi
			.get("http://localhost/restaurant-project/api/menu/")
			.then(response => {
				const menuItems = response.data;
				dispatch(fetchMenuSuccess(menuItems));
			})
			.catch(e => {
				const error = e.message;
				dispatch(fetchMenuFailure(error));
			});
	};
}