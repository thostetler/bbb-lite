import React from 'react';
import { Link } from '../../utils/routes';
import { connect } from 'react-redux';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.onPrevious = this.onPrevious.bind(this);
    this.onNext = this.onNext.bind(this);
  }

  onPrevious() {
    const { dispatch, query } = this.props;
    const { start, rows } = query;
    dispatch({ type: 'QUERY', payload: {
      start: start - rows
    }});
  }

  onNext() {
    const { dispatch, query } = this.props;
    const { start, rows } = query;
    dispatch({ type: 'QUERY', payload: {
      start: start + rows
    }});
  }

	render() {
    const { docs, pageInfo, loading, numFound } = this.props;

    if (!docs || docs.length === 0) {
      return (
      <div className="tc mt3">
        <i className="fa fa-spin fa-spinner fa-3x" />
      </div>
      );
    }

		return (
      <div className="pa1 pa3-ns root">
        <div className="flex justify-between">
          <div className="content-start">
            Page { pageInfo && pageInfo.currentPage + 1 } of { pageInfo && pageInfo.totalPages }
          </div>
          <div className="content-end">
            Total Results: {numFound}
          </div>
        </div>
        <div className="flex items-center justify-center pa1">
          {pageInfo.hasPreviousPage &&
            <a onClick={this.onPrevious} className="pointer f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4 disabled">
              <i className="fa fa-chevron-left"/>
              <span className="pl1">Previous</span>
            </a>
          }
          {pageInfo.hasNextPage &&
            <a onClick={this.onNext} className="pointer f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box">
              <span className="pr1">Next</span>
              <i className="fa fa-chevron-right"/>
            </a>
          }
        </div>
        <ul className="list pl0 center">
          {loading &&
            <div className="tc">
              <i className="fa fa-spin fa-spinner fa-3x" />
            </div>
          }

          {!loading && docs && docs.length === 0 &&
            <div>No Results</div>
          }

          {!loading && docs && docs.length > 0 && docs.map(doc =>
            <Link key={doc.bibcode} route="abstract" params={{ bibcode: doc.bibcode }}>
              <a className="link">
                <li
                  className="lh-solid pv2 ph1 ba bl-0 bt-0 br-0 b--dotted b--black-30 hover-bg-black-10"
                >
                  <p className="lh-title blue">
                    { doc.title }
                  </p>
                  <p className="black">
                    { doc.authors && doc.authors.join('; ') }
                  </p>
                </li>
              </a>
            </Link>
          )}
        </ul>
        <div className="flex items-center justify-center pa1">
          {pageInfo.hasPreviousPage &&
            <a onClick={this.onPrevious} className="pointer f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4 disabled">
              <i className="fa fa-chevron-left"/>
              <span className="pl1">Previous</span>
            </a>
          }
          {pageInfo.hasNextPage &&
            <a onClick={this.onNext} className="pointer f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box">
              <span className="pr1">Next</span>
              <i className="fa fa-chevron-right"/>
            </a>
          }
        </div>
        <style jsx>{`
          li {
            transition: background ease-in-out 0.25s
          }
          ul {
            min-height: 800px;
          }
        `}</style>
      </div>
    );
	}
}

const mapStateToProps = (state) => ({
  query: state.main.query
});

export default connect(mapStateToProps)(Results);
