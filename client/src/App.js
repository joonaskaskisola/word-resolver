import React from 'react';
import './App.css';

class App extends React.PureComponent {
	state = {
		letters: [],
		inputs: 1
	};

	onChange = e => {
		let letters = this.state.letters;
		letters[e.target.name] = e.target.value;
		let inputs = letters.filter(letter => letter.length === 1).length + 1;
		this.setState({letters, inputs});
	};

	submit = () => {
		this.props.resolver(
			this.state.letters
		);
	};

	componentDidUpdate(nextProps) {
		const { matches } = this.props;
		console.log(matches);
	}

	render() {
		return (
			<div className='app'>
				<header>
					<h1>Word finder</h1>
				</header>

				<p>Syötä applikaatiossa näkyvät kirjaimet:</p>

				<div className='letters'>
					{[...Array(this.state.inputs)].map((e, i) => {
						return (
							<input
								key={Math.random()}
								className='letter'
								maxLength='1'
								size='1'
								name={i}
								pattern='[a-zA-ZäöÄÖ]'
								type='text'
								value={this.state.letters[i]}
								onChange={this.onChange}
							/>
						);
					})}

					<input type='submit' value='Search!' onClick={this.submit}/>
				</div>

				{false > 0 && (
					<div className='results'>
						<h2>Löydetyt sanat:</h2>

						<div className='result'>
							{this.props.matches.map(match => {
								return <div key={match}>{match}</div>;
							})}
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default App;
