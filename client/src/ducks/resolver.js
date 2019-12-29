import {Map, List} from 'immutable';
import API from '../services/api';

const defaultState = Map({
	matches: List([])
});

const WORDS_PENDING = 'WORDS_PENDING';
const WORDS_REJECTED = 'WORDS_REJECTED';
const WORDS_FULFILLED = 'WORDS_FULFILLED';

export const resolver = (letters) => dispatch => {
	let promise = API.resolveWords(letters);

	dispatch({type: WORDS_PENDING, payload: promise});

	promise
		.then(res => {
			dispatch({type: WORDS_FULFILLED, payload: res});
		})
		.catch(error => {
			dispatch({type: WORDS_REJECTED, promise, error});
		});
};

export default function wordReducer(state = defaultState, action) {
	const {type, payload} = action;

	switch (true) {
		case type.endsWith('_REJECTED'):
			return state.set('matches', List());
		default:
			switch (type) {
				case WORDS_FULFILLED:
					return state.set('matches', payload.matches);
				default:
					return state;
			}
	}
}
