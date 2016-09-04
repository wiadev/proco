import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Header, Footer } from '../../components';

require('../../../node_modules/cutestrap/dist/css/cutestrap.min.css');
require('./style.css');

function mapStateToProps(state) {
	return {
		app: state
	};
}

function mapDispatchToProps(dispatch) {
	return {
		pushRoute: (any) => dispatch(push(any)),
	};
}

class App extends React.Component {

	render() {
		const { pushRoute } = this.props;

		return (
			<div>
				<Header push={pushRoute} />
				{this.props.children && React.cloneElement(this.props.children, {
					parentState: this.state, // This is here because it's handy and we don't need redux in an app like this.
				})}
				<Footer />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
