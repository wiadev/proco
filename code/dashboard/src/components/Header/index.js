import * as React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
  constructor(props) {
		super(props);
  }

	render() {
		return (
			<header className="grid wrapper">
		   	<div>
				<a href="http://www.barbar.com.tr/?ref=topdev" target="_blank">
					<img src="https://barbaruploads.s3.amazonaws.com/bicoz/logo@x2.png" height="50px" />
				</a>
			</div>

		 </header>
		);
	}
}
