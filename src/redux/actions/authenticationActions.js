import {
	AUTHENTICATION_REQUEST,
	AUTHENTICATION_SUCCESS,
	AUTHENTICATION_FAILURE,
	AUTHENTICATION_RETRY,
	UNAUTHENTICATE,
} from "./actionTypes";

import axios from 'axios';
import usersApi from "../../apis/usersApi";

export function checkAuthentication() {
	return (dispatch) => {
		const isLogged = JSON.parse(localStorage.getItem("isLogged"));
		isLogged ? dispatch(authenticate()) : dispatch(unauthenticate());
	};
}

export function logIn(user, password) {
	return function(dispatch) {
		dispatch(authenticationRequest());
		axios
			.post("http://localhost/restaurant-project/api/users/login/", {
				email: user,
				password: password
			})
			.then(function(response) {
				console.log(response);
				const authenticationData = response.data;
				if (authenticationData.authenticated) {
					localStorage.setItem("isLogged", true);
					localStorage.setItem("username", authenticationData.username);
					localStorage.setItem("userId", authenticationData.userId);
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
		type: AUTHENTICATION_REQUEST,
	};
}

export function authenticate() {
	return {
		type: AUTHENTICATION_SUCCESS,
	};
}

export function authenticationFailure(error) {
	return {
		type: AUTHENTICATION_FAILURE,
		payload: error,
	};
}

export function authenticationRetry() {
	return {
		type: AUTHENTICATION_RETRY,
	};
}

export function logOut() {
	return (dispatch) => {
		localStorage.setItem("isLogged", false);
		delete localStorage.username;
		dispatch(unauthenticate());
	};
}

export function unauthenticate() {
	return {
		type: UNAUTHENTICATE,
	};
}
