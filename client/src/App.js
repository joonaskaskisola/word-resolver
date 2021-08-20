import React from 'react';
import './App.css';

class App extends React.Component {
	state = {
		letters: [''],
		inputs: 1
	};

	onChange = e => {
		let fieldName = e.target.name,
				letters = this.state.letters;

		letters[fieldName] = e.target.value;
		this.props.resolver(letters);
		this.setState({letters, inputs: letters.filter(letter => letter.length === 1).length + 1});

		setTimeout(() => {
			if (this.refs[parseInt(fieldName, 10) + 1]) {
				this.refs[parseInt(fieldName, 10) + 1].focus();
			}
		}, 10);
	};

	shouldComponentUpdate = (a, b) => {
		return true;
	};

	componentDidMount = () => {
		this.refs[0].focus();
	};

	onKeyDown = e => {
		console.log(e);
		if (e.keyCode === 8) {
			window.location.reload();
		}
	}

	render() {
		return (
			<div className='app'>
				<header>
					<h1>SANAVÄLIPALA</h1>
				</header>

				<p>Syötä pelissä näkyvät kirjaimet:</p>

				<div className='letters'>
					{[...Array(this.state.inputs)].map((e, i) => {
						return (
							<input
								key={i}
								name={i}
								ref={i}
								maxLength='1'
								size='1'
								pattern='[a-zA-ZäöÄÖ]'
								type='text'
								value={this.state.letters[i] ? this.state.letters[i] : ''}
								onChange={this.onChange}
								onKeyDown={this.onKeyDown}
							/>
						);
					})}
				</div>

				{this.props.matches && this.props.matches.length > 0 && (
					<div className='results'>
						<h2>Tulokset:</h2>

						<div className='result'>
							{this.props.matches.reverse().map(matches => {
								return matches['matches'].map(match => {
									return <div key={match}>
										{match}
									</div>
								})
							})}
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default App;
