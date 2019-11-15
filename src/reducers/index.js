import {combineReducers} from 'redux';

import emojiMap from './emojiMap';
import config from './config';

const rootReducer = combineReducers({
  emojiMap,
  config,
})

export default rootReducer;