import {
	ADMIN_AUTHENTICATION_REQUEST,
	ADMIN_AUTHENTICATION_FAILURE,
	ADMIN_AUTHENTICATION_SUCCESS,
	ADMIN_AUTHENTICATION_RETRY,
	ADMIN_UNAUTHENTICATE,
} from "../../actions/actionTypes";

const initialState = {
	isLogged: null,
	loading: false,
	error: ""
};

function authenticationReducer(state = initialState, action) {
	switch (action.type) {
		case ADMIN_AUTHENTICATION_REQUEST:
			return { ...state, loading: true, error: "" };
		case ADMIN_AUTHENTICATION_SUCCESS:
			return { isLogged: true, loading: false, error: "" };
		case ADMIN_AUTHENTICATION_FAILURE:
			return { isLogged: false, loading: false, error: action.payload };
		case ADMIN_UNAUTHENTICATE:
			return { ...state, isLogged: false };
		case ADMIN_AUTHENTICATION_RETRY:
			 return { ...state, error: '' };
		default:
			return state;
	}
}

export default authenticationReducer;
