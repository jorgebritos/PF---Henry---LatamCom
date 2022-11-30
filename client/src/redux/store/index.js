import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';
import { combineReducers } from 'redux';


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store
