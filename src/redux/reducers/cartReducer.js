import {
	ADD_TO_CART,
	INCREASE_QUANTITY,
	DECREASE_QUANTITY,
	DELETE_CART_ITEM,
	CLEAR_CART
} from "../actions/actionTypes";

const initialState = {
	cartItems: [],
};

function cartReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_TO_CART: {
			const item = { ...action.payload, qty: 1 };
			return { ...state, cartItems: [...state.cartItems, item] };
		}

		case INCREASE_QUANTITY: {
			const newCartItems = state.cartItems.map((item) => {
				if (item.id === action.payload) {
					return { ...item, qty: item.qty + 1 };
				}
				return item;
			});
			return { ...state, cartItems: newCartItems };
		}

		case DECREASE_QUANTITY: {
			const newCartItems = state.cartItems.map((item) => {
				if (item.id === action.payload) {
					return { ...item, qty: item.qty - 1 };
				}
				return item;
			});
			return { ...state, cartItems: newCartItems };
		}

		case DELETE_CART_ITEM: {
			const newCartItems = state.cartItems.filter((item) => {
				if (item.id === action.payload) {
					return false;
				}
				return true;
			});
			return { ...state, cartItems: newCartItems };
		}

		case CLEAR_CART: {
			return { cartItems: [] };
		}

		default: {
			return state;
		}
	}
}

export default cartReducer;
