import {
	FETCH_USERS_REQUEST,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_FAILURE,
	FETCH_USER_REQUEST,
	FETCH_USER_SUCCESS,
	FETCH_USER_FAILURE,
	ADD_USER,
	DELETE_USER,
	EDIT_USER
} from "./actionTypes";

import usersApi from "../../apis/usersApi";

export function fetchUsersRequest() {
	return {
		type: FETCH_USERS_REQUEST
	};
}

export function fetchUsersSuccess(users) {
	return {
		type: FETCH_USERS_SUCCESS,
		payload: users
	};
}

export function fetchUsersFailure(error) {
	return {
		type: FETCH_USERS_FAILURE,
		payload: error
	};
}

export function fetchUsers() {
	return dispatch => {
		dispatch(fetchUsersRequest());
		usersApi
			.get("https://jsonplaceholder.typicode.com/users")
			.then(response => {
				const users = response.data;
				dispatch(fetchUsersSuccess(users));
			})
			.catch(e => {
				const error = e.message;
				dispatch(fetchUsersFailure(error));
			});
	};
}

export function fetchUser(id) {
	return (dispatch) => {
		dispatch(fetchUserRequest());
		usersApi
			.get(`/${id}`)
			.then((response) => {
				const user = response.data;
				dispatch(fetchUserSuccess(user));
			})
			.catch((e) => {
				const error = e.message;
				dispatch(fetchUserFailure(error));
			});
	};
}

export function fetchUserRequest() {
	return {
		type: FETCH_USER_REQUEST,
	};
}

export function fetchUserSuccess(blog) {
	return {
		type: FETCH_USER_SUCCESS,
		payload: blog,
	};
}

export function fetchUserFailure(error) {
	return {
		type: FETCH_USER_FAILURE,
		payload: error,
	};
}

export function addUser(userData) {
	return {
		type: ADD_USER,
		payload: {
			name: userData.name,
			email: userData.email
		}
	};
}


export function deleteUser(id) {
	return {
		type: DELETE_USER,
		payload: id
	}
}

export function editUser(id, newValues) {
	return {
		type: EDIT_USER,
		payload: {
			id,
			name: newValues.name,
			email: newValues.email
		}
	}
}