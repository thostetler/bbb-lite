const initialState = {
	bibcode: ''
}

const main = (state = initialState, action) => {
	switch (action.type) {
    case 'RECEIVED_QUERY':
      return { ...state, bibcode: action.payload };
		default:
			return state;
	}
}

export default main;
