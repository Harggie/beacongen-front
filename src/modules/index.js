import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './login';
import buildings from './buildings';
import floors from './floors';

export default combineReducers({
  routing: routerReducer,
  login,
  buildings,
  floors
});