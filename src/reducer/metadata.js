const initialState = {
  bibcode: '',
  doi: ''
}

const metadata = (state = initialState, action) => {
	switch (action.type) {
    case 'UPDATE_METADATA':
      return { ...state, ...action.payload };
		default:
			return state;
	}
}

export default metadata;
