import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';

import physical from '../middleware/physical';

const initialState = {};

const store = createStore(rootReducer, initialState, applyMiddleware(
  physical
));

export default store;