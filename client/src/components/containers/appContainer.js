import App from '../../App';
import {connect} from 'react-redux';
import {resolver} from '../../ducks/resolver';
import {compose} from 'recompose';

export default compose(
	connect(
		state => ({
			matches: state.resolver.get('matches')
		}),
		{
			resolver
		}
	)
)(App);
