import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';

const content = () => (
	<section className="center pa-2 w-80 mt5">
		<SearchBar />
	</section>
)

class Index extends React.Component {
	static async getInitialProps({ store }) {

	}

	render() {
		return (
			<Layout
				content={content()}
			/>
		)
	}
}

export default connect()(Index)
