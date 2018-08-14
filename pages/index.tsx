import React from 'react'
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';

const content = () => (
	<section className="center pa-2 w-80 mt5">
		<SearchBar />
	</section>
)

class Index extends React.Component {
	static async getInitialProps() {

	}

	render() {
		console.log(this.props);
		return (
			<Layout content={content()} />
		)
	}
}

export default Index;
