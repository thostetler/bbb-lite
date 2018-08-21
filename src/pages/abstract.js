import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux';
import Layout from '../components/Layout';

const Section = ({ title, content }) => (
  <section>
    <h3 className="f3 f2-m fl-1">{title}</h3>
    <hr/>
    <p className="measure lh-copy">{JSON.stringify(content)}</p>
  </section>
)

const Content = ({ doc }) => {
  if (Object.keys(doc).length <= 0) {
    return 'not found';
  }
  return (
    <article className="center w-80 mt5 bg-white b-near-black pa3">
      {Object.keys(doc).map(k => (
        <Section key={k} title={k} content={doc[k]} />
      ))}
    </article>
  );
}

class Abstract extends React.Component {
  static async getInitialProps({ query, store }) {
    console.log('abstract page', query);
    const { bibcode } = query;
    store.dispatch({ type: 'QUERY', payload: bibcode });
	}

	render() {
		return (
      <Layout content={
        <Content doc={this.props.doc} />
      } />
		)
	}
}
const mapStateToProps = (state) => ({
  doc: state.main.doc
});

export default connect(mapStateToProps)(Abstract);
