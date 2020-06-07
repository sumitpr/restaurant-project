import { combineReducers } from 'redux';

import usersReducer from './usersReducer';
import blogsReducer from './blogsReducer';
import authenticationReducer from './authenticationReducer';
import menuReducer from './menuReducer';
import cartReducer from './cartReducer';
import checkoutReducer from './checkoutReducer';
import adminAuthenticationReducer from './admin/authenticationReducer';
import adminReducer from './admin/adminReducer';

const rootReducer = combineReducers({
	users: usersReducer,
	blogs: blogsReducer,
	authentication: authenticationReducer,
	menu: menuReducer,
	cart: cartReducer,
	orders: checkoutReducer,
	adminAuthentication: adminAuthenticationReducer,
	admin: adminReducer
});

export default rootReducer;