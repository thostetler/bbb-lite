import React from 'react'
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import Results from '../components/Results';
import { connect } from 'react-redux';

class Search extends React.Component {
	static async getInitialProps({ query, store }) {
    console.log('lsdkjf', store.getState());
    //dispatch({ type: 'QUERY', payload: query})
  }

  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(query) {
    const { dispatch } = this.props;
		dispatch({ type: 'QUERY', payload: { query } });
  }

	render() {
    const { docs, pageInfo, loading, numFound } = this.props;
		return (
			<Layout content={(
        <section className="center pa-2 w-80 mt5">
          <SearchBar onSubmit={this.onSearch} />
          <Results docs={docs} loading={loading} pageInfo={pageInfo} numFound={numFound} />
        </section>
      )} />
		)
	}
}

const mapStateToProps = (state) => ({
  docs: state.main.docs,
  loading: state.main.loading,
  pageInfo: state.main.pageInfo,
  numFound: state.main.numFound
});

export default connect(mapStateToProps)(Search);
