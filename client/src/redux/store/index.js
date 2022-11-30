import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer'; 
import getReducer from '../reducer/getreducers';

let combinedReducers = combineReducers;

let rootReducers = combinedReducers({
    allTheOthers: rootReducer,
    gets: getReducer
})

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));

export default store
