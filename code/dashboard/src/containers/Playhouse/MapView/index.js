import * as React from 'react';
import { push } from 'react-router-redux'
import { connect } from 'react-redux';

import { Loader } from '../../../components'

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps (dispatch) {
	return {
		pushRoute: (any) => dispatch(push(any))
	};
}


export class MapView extends React.Component {
	constructor(props) {
     super(props);
     this.state = {isLoading: false};
  }


	render() {
		return (

			<section className="wrapper ta-center">
			  <h3>Hoşgeldiniz.</h3>
			  <p>
          Üst menüden seçim yaparak devam edebilirsiniz.
			  </p>
			</section>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
