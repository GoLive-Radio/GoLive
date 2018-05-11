import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import broadcast from './broadcast';
import broadcasts from './broadcasts';
import broadcastsByStation from './broadcastsByStation';
import stations from './stations';

const reducer = combineReducers({user, broadcast, broadcasts, broadcastsByStation, stations});
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './broadcast';
export * from './broadcasts';
export * from './broadcastsByStation';
export * from './stations';

