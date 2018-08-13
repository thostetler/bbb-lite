import React from 'react';
import Link from 'next/link';

export default class NavBar extends React.Component {

	render() {
		return (
			<nav className="flex justify-between bb b--white-10 bg-near-black">
				<Link href="/">
					<a
						alt="ADS Lite"
						className="link white-70 hover-white no-underline flex items-center pa3"
					>ADS Lite</a>
				</Link>
				<div className="flex-grow pa3 flex items-center">
					<Link href="/aboutus">
						<a className="f6 link dib white dim mr3 mr4-ns">About</a>
					</Link>
				</div>
			</nav>
		);
	}
}
