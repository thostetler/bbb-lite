import React from 'react'
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';

const content = (props) => (
	<section className="center pa-2 w-80 mt5">
		{props.q}
	</section>
)

class Index extends React.Component {
	static async getInitialProps() {

	}

	render() {
		const props = this.props;
		console.log('props', this.props);
		return (
			<Layout content={content(props)} />
		)
	}
}

export default Index;
