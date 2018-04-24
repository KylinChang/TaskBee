/*
 * Index file for all reducers, combining all reducers together
*/
import {
  combineReducers,
} from 'redux';

import {user,} from './user'

export default Reducers = combineReducers({
  user,
});
