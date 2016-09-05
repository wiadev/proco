import * as React from 'react';

export default function Home() {
	return (<section className="wrapper ta-center">
		<h3>Welcome.</h3>
		<p>
			Use the header to navigate.
			<br />
			<small>Q: Why do we have this page? It seems redundant. A: This only appear on local. On production, the index is our landing.</small>
		</p>
	</section>);
}
