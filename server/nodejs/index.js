const express = require('express');
const fs = require('fs');
const xml = fs.readFileSync('./kotus-sanalista_v1.xml', 'utf8');
const XmlReader = require('xml-reader');
const reader = XmlReader.create();
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

let state = {};

reader.on('done', data => (state.xml = data));
reader.parse(xml);

const find = (wordLetters, length = 0) => {
	wordLetters = wordLetters.toLowerCase();

	let letters = wordLetters.split('').reduce((carry, letter) => {
		let match = carry.find(i => i.letter === letter);

		if (match) {
			match.occurences++;
		} else {
			carry.push({letter, 'occurences': 1});
		}

		return carry;
	}, []);

	let matchingSizes = state.xml.children.reduce((carry, wordObj) => {
		let word = wordObj.children[0].children[0].value;
		if (word.length === length) {
			carry.push(word);
		}

		return carry;
	}, []);

	return matchingSizes
		.reduce((carry, sana) => {
			let i = 0;

			letters.forEach(letterObj => {
				switch (sana.split(letterObj.letter).length - 1) {
					case letterObj.occurences:
						i += letterObj.occurences;
						break;
					case 0:
						break;
					default:
						i--;
						break;
				}
			});

			if (i === length) {
				carry.push(sana);
			}

			return carry;
		}, [])
		.filter((value, index, self) => self.indexOf(value) === index);
};

app.post('/resolve', (req, res) => {
	res.send({
		matches: find(
			req.body.letters,
			req.body.length === 0
				? req.body.letters.length
				: parseInt(req.body.length)
		)
	});
});

app.listen(3001, () =>
	console.log('Word resolver app listening on port 3001!')
);
