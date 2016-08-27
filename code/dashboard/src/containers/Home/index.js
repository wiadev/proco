import * as React from 'react';
import { Loader } from '../../components'

export class Home extends React.Component<IProps, any> {
	constructor(props) {
     super(props);
     this.state = {isLoading: false};
  }

	render() {
		return (

			<section className="wrapper-small ta-center">
			  <h3>Welcome</h3>
			  <p>
			   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet.
			  </p>
			</section>
		);
	}
}

export default Home;