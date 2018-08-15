import React from 'react'
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';

const content = ({ q }) => (
	<section className="center pa-2 w-80 mt5">
		{q}
	</section>
)

class Search extends React.Component {
	static async getInitialProps({ query }) {
		try {
      const data = await fetch(`http://localhost:8000/v1/search/query?q=${query.q}&fl=title%2Cabstract%2Ccomment%2Cbibcode%2Cauthor%2Ckeyword%2Cid%2Ccitation_count%2C%5Bcitations%5D%2Cpub%2Caff%2Cvolume%2Cpubdate%2Cdoi%2Cpub_raw%2Cpage%2Clinks_data%2Cproperty%2Cesources%2Cdata%2Cemail%2Cdoctype&rows=20&start=0`, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer:nygCEUOLMpBgsSw5tcWOzg1neANMaxqkfrHRXu59'
        }
      });
      const response = await data.json();
      return response.response.docs;
    } catch (e) {
      return {};
    }
	}

	render() {
		const props = this.props;
		console.log('props', this.props);
		return (
			<Layout content={content(props)} />
		)
	}
}

export default Search;
