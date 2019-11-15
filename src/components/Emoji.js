import React from 'react';

const Emoji = ({ emoji }) => (
  <span role="img" aria-label={emoji.label}>{emoji.code}</span>
);

export default Emoji;