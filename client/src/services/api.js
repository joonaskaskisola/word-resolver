import axios from 'axios';

const XML_PATH = '/kotus-sanalista_v1.xml';
const API_URL = 'http://localhost:3001/resolve';

async function getKotusWords() {
	return axios
		.get(XML_PATH)
		.then(res => res.data)
		.catch(e => e);
}

async function getWords(letters, length = 0) {
	return axios
		.post(API_URL, {
			letters: letters.join(""),
			length: length === 0 ? null : length
		})
		.then(res => res.data)
		.catch(e => e);
}

export default {
	getKotusWords,
	getWords
};
