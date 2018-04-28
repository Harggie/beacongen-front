import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './login';
import buildings from './buildings';

export default combineReducers({
  routing: routerReducer,
  login,
  buildings
});