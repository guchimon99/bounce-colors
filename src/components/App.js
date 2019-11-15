import React from 'react';
import {Provider} from 'react-redux';

import store from '../store';

import World from './World';
import Control from './Control';

function App() {
  return (
    <Provider store={store}>
      <World />
      <Control />
    </Provider>
  );
}

export default App;
