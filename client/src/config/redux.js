import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'react-thunk';
import * as reducers from '../ducks';

export function getMiddlewares() {
	return [thunk, promiseMiddleware()];
}

export function getReducers() {
	return reducers;
}

export function getEnhancers() {
	return [];
}
