import 'isomorphic-fetch'
import React from 'react'
import NavBar from '../components/NavBar';

class Abstract extends React.Component {
	static async getInitialProps() {

	}

	render() {
		return (
			<NavBar />
		)
	}
}

export default Abstract;
