import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './login';
import buildings from './buildings';
import floors from './floors';
import areas from './areas';
import beacons from './beacons';
import dialog from './dialog';

export default combineReducers({
  routing: routerReducer,
  login,
  buildings,
  floors,
  areas,
  beacons,
  dialog
});