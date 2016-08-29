import * as React from 'react';
import { Header, Footer } from '../../components';

class App extends React.Component {

	render() {
		return (
			<div>
				<Header />
				{this.props.children}
				<Footer />
			</div>
		);
	}
}

export default App;
