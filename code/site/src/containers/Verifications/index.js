import * as React from "react";
import {Loader} from "../../components";
import firebase from "firebase";

export default class Verifications extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			message: null,
		};
	}

	componentWillMount() {
		const key = this.props.location.query.key;
		if (!key) {
			this.setState({
				isLoading: false,
				message: 'This links seems to be invalid',
			});
		} else {
			const database = firebase.database();

			console.log("key", key)
			database.ref('/tasks/network-email-verification-web-indexes/' + key)
				.once('value')
				.then(snap => {
					console.log("snap", snap, snap.ref.toString())
					return snap.val();
				})
				.then((token) => {
					console.log("token", token)
					return database
						.ref('/tasks/network-email-verification-web-keys/' + key)
						.set(token)
						.then(() => this.setState({
							isLoading: false,
							message: 'You can now go back to the app.',
						}));
				})

		}
	}

	render() {
		return (

			<section className="wrapper-small ta-center">
				<h3>E-mail verification</h3>
				{this.state.isLoading ? <Loader /> : <h4>{this.state.message}</h4>}
			</section>
		);
	}
}