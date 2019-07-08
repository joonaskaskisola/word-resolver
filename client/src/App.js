import React from "react";
import "./App.css";

class App extends React.PureComponent {
	state = {
		letter0: "k",
		letter1: "o",
		letter2: "i",
		letter3: "r",
		letter4: "a",
		letter5: "",
		wordLength: 4
	};

	onChange = e => {
		this.setState({[e.target.name]: e.target.value});
	};

	submit = () => {
		this.props.resolver(
			[
				this.state.letter0,
				this.state.letter1,
				this.state.letter2,
				this.state.letter3,
				this.state.letter4,
				this.state.letter5
			],
			this.state.wordLength
		);
	};

	inputs = [
		{name: "letter0"},
		{name: "letter1"},
		{name: "letter2"},
		{name: "letter3"},
		{name: "letter4"},
		{name: "letter5"}
	];

	render() {
		return (
			<div className="app">
				<header>
					<h1>Word finder</h1>
				</header>

				<p>Syötä applikaatiossa näkyvät kirjaimet:</p>
				<div className="wordLength">
					<input
						type="number"
						key="wordLength"
						name="wordLength"
						maxLength="1"
						min="0"
						max="10"
						size="1"
						value={this.state.wordLength}
						onChange={this.onChange}
					/>
				</div>
				<div className="letters">
					{this.inputs.map((f, index) => {
						return (
							<input
								key={f.name}
								className="letter"
								maxLength="1"
								size="1"
								pattern="[a-zA-ZäöÄÖ]"
								type="text"
								name={f.name}
								value={this.state[f.name]}
								onChange={this.onChange}
							/>
						);
					})}

					<input type="submit" value="Search!" onClick={this.submit}/>
				</div>
				{this.props.matches.length > 0 && (
					<div className="results">
						<h2>Löydetyt sanat:</h2>

						<div className="result">
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
