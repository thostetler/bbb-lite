import React from 'react'
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';

const Content = ({ onSubmit }) => (
	<section className="center pa2 w-80 mt5">
		<SearchBar onSubmit={onSubmit} />
	</section>
)

class Index extends React.Component {
	static async getInitialProps(store) {
    const state = (typeof store.getState === 'function') ? store.getState() : {};
    return state;
  }

  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(query) {
    const { dispatch } = this.props;
		dispatch({ type: 'RECEIVED_QUERY', payload: query });
		dispatch({
			type: 'ROUTE',
			payload: {
				route: '/search',
				query: { q: query }
			}
		});
  }

	render() {
    console.log(this.props);
		return (
			<Layout content={
        <Content onSubmit={this.onSearch} />
      } />
		)
	}
}

const mapStateToProps = (state) => ({
  bibcode: state.main.bibcode
});

export default connect(mapStateToProps)(Index);
