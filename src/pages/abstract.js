import 'isomorphic-fetch'
import React from 'react'
import Layout from '../components/Layout';

const Section = ({ title, content }) => (
  <section>
    <h3 className="f3 f2-m fl-1">{title}</h3>
    <hr/>
    <p className="measure lh-copy">{JSON.stringify(content)}</p>
  </section>
)

const content = (data) => {
  if (Object.keys(data).length <= 0) {
    return 'not found';
  }
  return (
    <article className="center w-80 mt5 bg-white b-near-black pa3">
      {Object.keys(data).map(k => (
        <Section key={k} title={k} content={data[k]} />
      ))}
    </article>
  );
}

class Abstract extends React.Component {
  static async getInitialProps({ query }) {
    console.log('getting abstract information', query, arguments);
	}

	render() {
		return (
      <Layout content={content(this.props)} />
		)
	}
}

export default Abstract;
