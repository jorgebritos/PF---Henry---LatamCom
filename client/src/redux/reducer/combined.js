import { combineReducers } from 'redux';
import rootReducer from '../reducer';

let combined = combineReducers(
  {
    rootReducer
  }
)

export default combined;
