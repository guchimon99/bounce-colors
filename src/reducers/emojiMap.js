const initialState = [];

const emojiMap = (state = initialState, action) => {
  if (action.type === "EMOJI_MAP/SET") {
    return action.payload.emojiMap;
  }

  return state;
}

export default emojiMap;