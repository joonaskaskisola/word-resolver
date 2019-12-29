import axios from 'axios';

const XML_PATH = '/kotus-sanalista_v1.xml';
const API_URL = 'http://localhost:3001/resolve';

async function getKotusWords() {
	return axios
		.get(XML_PATH)
		.then(res => res.data)
		.catch(e => e);
}

async function resolveWords(letters) {
	let n = 0, promises = [];
	letters.forEach(i => {
		n++;
		promises.push(this.getWords(letters, n));
	});

	return Promise.all(promises);
}

async function getWords(letters, letterCount) {
	return axios
		.post(API_URL, {
			letters: letters.join(''),
			length: letterCount
		})
		.then(res => res.data);
}

export default {
	getKotusWords,
	resolveWords,
	getWords
};
