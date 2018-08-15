import React from 'react';
import { connect } from 'react-redux';

const Footer = ({ bibcode }) => (
	<footer className="pv4 ph3 ph5-m ph6-l mid-gray bt b-near-black tc">
		Searching for <strong>{bibcode}</strong>
	</footer>
)

const mapStateToProps = (state) => ({
	bibcode: state.main.bibcode
});

export default connect(mapStateToProps)(Footer);
