import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer'; 
import combined from '../reducer/combined';//combinación de reducers

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store
