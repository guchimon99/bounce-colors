import emojis from '../constants/emojis';

const initialState = {
  current: emojis[0]
};

const config = (state = initialState, action) => {
  if (action.type === 'CONFIG/SET_CURRENT') {
    return {
      ...state,
      current: action.payload.current
    };
  }

  return state;
}

export default config;