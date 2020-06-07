import {
	PLACE_ORDER_SUCCESS
} from "../actions/actionTypes";

const initialState = {
	orders: []
};

function checkoutReducer(state = initialState, action) {
	switch (action.type) {
		case PLACE_ORDER_SUCCESS: {
			return { ...state, orders: [...state.orders, action.payload] };
		}

		default: {
			return state;
		}
	}
}

export default checkoutReducer;
