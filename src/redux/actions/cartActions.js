import {
	ADD_TO_CART,
	INCREASE_QUANTITY,
	DECREASE_QUANTITY,
	DELETE_CART_ITEM,
	CLEAR_CART
} from "./actionTypes";

export function addToCart(item) {
	return {
		type: ADD_TO_CART,
		payload: item
	};
}

export function increaseQty(id) {
	return {
		type: INCREASE_QUANTITY,
		payload: id
	}
}

export function decreaseQty(id) {
	return {
		type: DECREASE_QUANTITY,
		payload: id
	}
}

export function deleteCartItem(id) {
	return {
		type: DELETE_CART_ITEM,
		payload: id
	}
}

export function clearCart() {
	return {
		type: CLEAR_CART,
	}
}
