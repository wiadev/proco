import * as React from 'react';
import { Link } from 'react-router';

export default class Error404 extends React.Component<void, void> {

	render() {
		return (			
			<div>
				<h1>404</h1>
				<Link to="/">
					Home
				</Link>
			</div>
		);
	}
}