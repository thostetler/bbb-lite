import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({
	header = <NavBar />,
	content,
	footer = <Footer />
}) => (
	<div className="flex flex-column items-stretch min-vh-100">
		<div>{ header }</div>
		<div className="pa3 flex-grow-1">{ content }</div>
		<div className="pa3">{ footer }</div>
	</div>
);

export default Layout;
