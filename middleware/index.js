import Redux, { compose } from 'redux';
import { Router } from '../utils/routes';
import qs from 'query-string';

const route = ({ dispatch }) => next => (action) => {
	next(action);
	if (action.type === 'ROUTE') {
		const { route, query, params, options } = action.payload;

		const path = `${route}?${qs.stringify(query)}`;

		Router.pushRoute(path, params, options);
	}
};

export default compose.apply(Redux, [
	route
]);
