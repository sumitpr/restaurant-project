import {
	FETCH_ORDERS_REQUEST,
	FETCH_ORDERS_SUCCESS,
	FETCH_ORDERS_FAILURE,
} from "../../actions/actionTypes";

const initialState = {
	loading: false,
	orders: [],
	currentOrder: null,
	error: "",
};

function orderReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_ORDERS_REQUEST: {
			return { ...state, loading: true };
		}
		case FETCH_ORDERS_SUCCESS: {
			return {
				...state,
				loading: false,
				orders: action.payload,
				error: "",
			};
		}
		case FETCH_ORDERS_FAILURE: {
			return {
				...state,
				loading: false,
				orders: [],
				error: action.payload,
			};
		}

		default: {
			return state;
		}
	}
}

export default orderReducer;
