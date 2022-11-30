import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer'; 
import getReducer from '../reducer/getreducers';

let combinedReducers = combineReducers;

let rotReducers = combinedReducers({
    allTheOthers: rootReducer,
    gets: getReducer
})

const store = createStore(rotReducers, composeWithDevTools(applyMiddleware(thunk)));

export default store
