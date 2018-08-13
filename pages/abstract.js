import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'

import NavBar from '../components/NavBar';

class Abstract extends React.Component {
	static async getInitialProps({ store }) {

	}

	render() {
		return (
			<NavBar />
		)
	}
}

export default connect()(Abstract)
