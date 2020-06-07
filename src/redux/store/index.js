import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

const store = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk))) : createStore(rootReducer, applyMiddleware(thunk));

export default store;