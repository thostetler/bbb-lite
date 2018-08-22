const initialState = {
  docs: [],
  numFound: 0,
  query: {
    q: '',
    rows: 10,
    start: 0
  },
  loading: false,
  pageInfo: {
    currentPage: 0,
    hasNextPage: true,
    hasPreviousPage: false,
    totalPages: 1
  },
  doc: {},
  docLoading: false
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
    case 'TOTAL_DOCS':
      return { ...state, numFound: action.payload };
    case 'PAGINATION':
      return { ...state, pageInfo: action.payload };
    case 'DOCS_LOADING':
      return { ...state, loading: action.payload };
    case 'DOC_LOADING':
      return { ...state, docLoading: action.payload };
    case 'DOC_RECEIVED':
      return { ...state, doc: action.payload };
    case 'UPDATE_STATE':
      return { ...(action.payload ? action.payload.main : state) };
		default:
			return state;
	}
}

export default main;
