import { combineReducers } from "../node_modules/redux";
import mainReducer from './main';

const rootReducer = combineReducers({ mainReducer });

export default rootReducer;
