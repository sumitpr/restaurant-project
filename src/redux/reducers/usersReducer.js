import {
	FETCH_USERS_REQUEST,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_FAILURE,
	FETCH_USER_REQUEST,
	FETCH_USER_SUCCESS,
	FETCH_USER_FAILURE,
	ADD_USER,
	DELETE_USER,
	EDIT_USER,
} from "../actions/actionTypes";

const initialState = {
	loading: false,
	users: [],
	currentUser: null,
	error: "",
};

function usersReducers(state = initialState, action) {
	switch (action.type) {
		case FETCH_USERS_REQUEST: {
			return { ...state, loading: true };
		}
		case FETCH_USERS_SUCCESS: {
			return {
				...state,
				loading: false,
				users: action.payload,
				error: "",
			};
		}
		case FETCH_USERS_FAILURE: {
			return {
				...state,
				loading: false,
				users: [],
				error: action.payload,
			};
		}

		case FETCH_USER_REQUEST: {
			return { ...state, currentUser: null, loading: true };
		}

		case FETCH_USER_SUCCESS: {
			return { ...state, currentUser: action.payload, loading: false };
		}

		case FETCH_USER_FAILURE: {
			return {
				...state,
				currentUser: null,
				loading: false,
				error: action.payload,
			};
		}

		case ADD_USER: {
			const users = [...state.users, action.payload];
			return { ...state, users };
		}

		case DELETE_USER: {
			const users = [...state.users];
			const userIndex = users.findIndex(
				(user) => user.id === action.payload
			);
			if (userIndex >= 0) {
				users.splice(userIndex, 1);
				return { ...state, users };
			} else {
				return state;
			}
		}
		case EDIT_USER: {
			const users = state.users.map((user, index) => {
				if (user.id === action.payload.id) {
					return {
						...user,
						name: action.payload.name,
						email: action.payload.email,
					};
				}
				return user;
			});

			return { ...state, users };
		}
		default: {
			return state;
		}
	}
}

export default usersReducers;
