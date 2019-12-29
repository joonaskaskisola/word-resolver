import axios from 'axios';

/**
 * @param letters
 * @returns {Promise}
 */
async function resolveWords(letters) {
	let n = 0, promises = [];
	letters.forEach(i => {
		n++;
		promises.push(getWords(letters, n));
	});

	return Promise.all(promises);
}

/**
 * @param letters
 * @param letterCount
 * @returns {Promise}
 */
async function getWords(letters, letterCount) {
	return axios
		.post('http://' + window.location.hostname + ':3001/resolve', {
			letters: letters.join(''),
			length: letterCount
		})
		.then(res => res.data);
}

export default {
	resolveWords
};
