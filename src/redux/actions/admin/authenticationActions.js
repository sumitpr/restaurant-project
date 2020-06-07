import {
	ADMIN_AUTHENTICATION_REQUEST,
	ADMIN_AUTHENTICATION_SUCCESS,
	ADMIN_AUTHENTICATION_FAILURE,
	ADMIN_AUTHENTICATION_RETRY,
	ADMIN_UNAUTHENTICATE,
} from "../actionTypes";

import axios from 'axios';

export function checkAuthentication() {
	return (dispatch) => {
		const isLogged = localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin").isLogged) : false;
		isLogged ? dispatch(authenticate()) : dispatch(unauthenticate());
	};
}

export function logIn(user, password) {
	return function(dispatch) {
		dispatch(authenticationRequest());
		axios
			.post("http://localhost/restaurant-project/api/admin/login/", {
				email: user,
				password: password
			})
			.then(function(response) {
				console.log(response);
				const authenticationData = response.data;
				if (authenticationData.authenticated) {
					localStorage.setItem("admin", JSON.stringify({isLogged: true}));
					dispatch(authenticate());
				} else {
					dispatch(authenticationFailure("Invalid username or password"));
				}
			})
			.catch((e) => {
				const error = e.message;
				dispatch(authenticationFailure(error));
			});
	};
}

export function authenticationRequest() {
	return {
		type: ADMIN_AUTHENTICATION_REQUEST,
	};
}

export function authenticate() {
	return {
		type: ADMIN_AUTHENTICATION_SUCCESS,
	};
}

export function authenticationFailure(error) {
	return {
		type: ADMIN_AUTHENTICATION_FAILURE,
		payload: error,
	};
}

export function authenticationRetry() {
	return {
		type: ADMIN_AUTHENTICATION_RETRY,
	};
}

export function logOut() {
	return (dispatch) => {
		localStorage.setItem("admin", JSON.stringify({isLogged: false}));
		dispatch(unauthenticate());
	};
}

export function unauthenticate() {
	return {
		type: ADMIN_UNAUTHENTICATE,
	};
}
