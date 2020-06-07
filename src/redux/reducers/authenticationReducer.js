import {
	AUTHENTICATION_REQUEST,
	AUTHENTICATION_FAILURE,
	AUTHENTICATION_SUCCESS,
	AUTHENTICATION_RETRY,
	UNAUTHENTICATE,
} from "../actions/actionTypes";

const initialState = {
	isLogged: null,
	loading: false,
	error: ""
};

function authenticationReducer(state = initialState, action) {
	switch (action.type) {
		case AUTHENTICATION_REQUEST:
			return { ...state, loading: true, error: "" };
		case AUTHENTICATION_SUCCESS:
			return { isLogged: true, loading: false, error: "" };
		case AUTHENTICATION_FAILURE:
			return { isLogged: false, loading: false, error: action.payload };
		case UNAUTHENTICATE:
			return { ...state, isLogged: false };
		case AUTHENTICATION_RETRY:
			 return { ...state, error: '' };
		default:
			return state;
	}
}

export default authenticationReducer;
