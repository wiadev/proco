import * as React from 'react';

export default class Footer extends React.Component {
	render() {
		return (
      <footer className="grid wrapper">
       <div className="copyright">
         <a href="#">Terms</a> -&nbsp;
         <a href="mailto:hey@barbar.com.tr">Contact</a>
       </div>
       <div className="ta-right">
         Made with axe & shield by <a href="http://www.barbar.com.tr/?ref=topdev" target="_blank">Barbar</a>
       </div>
     </footer>
		);
	}
}
