import React from 'react';
import { connect } from 'react-redux';

const Footer = ({ query }) => (
	<footer className="pv4 ph3 ph5-m ph6-l mid-gray bt b-near-black tc">
		Searching for <strong>{query}</strong>
	</footer>
)

const mapStateToProps = (state) => ({
	query: state.main.query.query
});

export default connect(mapStateToProps)(Footer);
