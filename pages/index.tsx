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
    console.log((typeof store.getState === 'function') ? store.getState() : {});
    return {
      // bibcode: store.getState().main.bibcode
    };
  }

  private onSearch(query) {
    console.log(this);
    console.log(query);
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
