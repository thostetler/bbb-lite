const initialState = {
  docs: [],
  query: {
    query: '',
    rows: 10,
    start: 0
  },
  loading: false,
  page: {
    currentPage: 0,
    hasNextPage: true,
    hasPreviousPage: false,
    totalPages: 1
  }
}

const main = (state = initialState, action) => {
	switch (action.type) {
    case 'DOCS_RECIEVED':
      return { ...state, docs: action.payload };
    case 'QUERY':
      return { ...state, query: {
        ...state.query,
        ...action.payload
      }};
    case 'PAGINATION':
      return { ...state, pageInfo: action.payload };
    case 'DOCS_LOADING':
      return { ...state, loading: action.payload };
		default:
			return state;
	}
}

export default main;
