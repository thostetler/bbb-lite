import { combineReducers } from "redux";
import main from './main';
import metadata from './metadata';

const rootReducer = combineReducers({ main, metadata });

export default rootReducer;
