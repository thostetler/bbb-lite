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
    try {
      const data = await fetch(`http://localhost:8000/v1/search/query?q=bibcode:${query.bibcode}&fl=title%2Cabstract%2Ccomment%2Cbibcode%2Cauthor%2Ckeyword%2Cid%2Ccitation_count%2C%5Bcitations%5D%2Cpub%2Caff%2Cvolume%2Cpubdate%2Cdoi%2Cpub_raw%2Cpage%2Clinks_data%2Cproperty%2Cesources%2Cdata%2Cemail%2Cdoctype&rows=1&start=0`, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer:nygCEUOLMpBgsSw5tcWOzg1neANMaxqkfrHRXu59'
        }
      });
      const response = await data.json();
      return response.response.docs[0];
    } catch (e) {
      return {};
    }
	}

	render() {
		return (
      <Layout content={content(this.props)} />
		)
	}
}

export default Abstract;
