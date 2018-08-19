import { Router } from '../../utils/routes';
import qs from 'query-string';
import doSearch from '../services/request';

// transition to a new route
const route = ({ dispatch }) => next => (action) => {
	next(action);
	if (action.type === 'ROUTE') {
		const { route, query, params, options } = action.payload;
    const qString = query ? `?${qs.stringify(query)}` : '';
		const path = route + qString;

		Router.pushRoute(path, params, options);
	}
};

const query = ({ dispatch, getState }) => next => async action => {
  next(action);
  if (action.type === 'QUERY') {
    dispatch({ type: 'DOCS_LOADING', payload: true });
    const payload = {
      ...getState().main.query,
      ...action.payload
    }
    console.log('payload', payload);
    const { query, rows, start } = payload;
    const response = await doSearch({
      query: `query($q: String!, $rows: Int, $start: Int) {
        search(q: $q, rows: $rows, start: $start) {
          pageInfo {
            totalPages
            currentPage
            hasNextPage
            hasPreviousPage
          }
          docs {
            title
            bibcode
            authors
          }
        }
      }`,
      variables: {
        q: query,
        rows: rows,
        start: start
      }
    });
    const json = await response.json();
    console.log('json', json);
    dispatch({ type: 'DOCS_LOADING', payload: false });
    dispatch({ type: 'DOCS_RECIEVED', payload: json.data.search.docs });
    dispatch({ type: 'PAGINATION', payload: json.data.search.pageInfo });
  }
};

export default [
  route,
  query
];
