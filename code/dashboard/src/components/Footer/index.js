import * as React from 'react';

export default class Footer extends React.Component<any, any> {
	render() {
		return (
      <footer className="grid wrapper">
       <div className="copyright">
         <a href="/dashboard">Dashboard</a>
       </div>
       <div className="ta-right">
         (c) 2016 <a href="http://barbar.digital" target="_blank">Barbar Startup Factory</a>
       </div>
     </footer>
		);
	}
}
