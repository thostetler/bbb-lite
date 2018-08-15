import Redux, { createStore, compose, applyMiddleware } from 'redux'

import rootReducer from '../reducer';
import rootMiddleware from '../middleware';

const enhancers = compose(
	typeof window !== 'undefined' && process.env.NODE_ENV !== 'production'
		? window.devToolsExtension && window.devToolsExtension()
		: f => f
)

const createStoreWithMiddleware = applyMiddleware(rootMiddleware)(createStore)

export default initialState =>
	createStoreWithMiddleware(rootReducer, initialState, enhancers)


	// const middleware = applyMiddleware.apply(Redux, [
	// 	...uiMiddleware,
	// 	...apiMiddleware(context)
	// ]);
	// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
	// const reducer = combineReducers({
	// 	api: api.reducer,
	// 	ui: ui.reducer
	// });
	// const store = createStore(reducer, composeEnhancers(middleware));
	// return store;
