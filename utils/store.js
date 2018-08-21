import { createStore, compose, applyMiddleware } from 'redux';
import { throttle } from 'lodash';
import { saveState } from '../src/services/localStorage';
import rootReducer from '../src/reducer';
import rootMiddleware from '../src/middleware';

const enhancers = compose(
	typeof window !== 'undefined' && process.env.NODE_ENV !== 'production'
		? window.devToolsExtension && window.devToolsExtension()
		: f => f
)

const createStoreWithMiddleware = applyMiddleware(...rootMiddleware)(createStore)

export default initialState =>
  createStoreWithMiddleware(rootReducer, initialState, enhancers);
