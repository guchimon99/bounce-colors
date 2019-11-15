import {Engine, World, Bodies} from 'matter-js';

const WIDTH = 600;
const HEIGHT = 600;
const COL_COUNT = 50;
const ROW_COUNT = 50;

const mState = {
  engine: null,
  world: null,
  bodies: [],
}

const skinTones = ['🏿', '🏾', '🏽', '🏼', '🏻', ''];

const generateEmojiWithTone = (emoji, tone) => {
  return {
    label: emoji.label,
    code: `${emoji.code}${skinTones[tone]}`,
  }
}

const createToneMap = (rowCount, colCount) => {
  return Array.from({length: ROW_COUNT}).map(() =>
    Array.from({length: COL_COUNT}).map(() => 0)
  );
}

const createEmojiMap = (toneMap, emoji) => {
  return toneMap.map((row) => {
    return row.map((tone) => {
      return generateEmojiWithTone(emoji, tone)
    })
  })
}

const addTone = (toneMap, row, col, width, height) => {
  return toneMap.map((r, ri) => {
    return r.map((c, ci) => {
      if (
        row <= ri && ri < row + height
        && col <= ci && ci < col + width
      ) {
        return Math.min(5, c + 1);
      }
      return c;
    })
  })
}

const addRectangle = () => {
  const { world, bodies } = mState;
  const body = Bodies.rectangle(
    WIDTH * Math.random(), HEIGHT * 0, 60, 60
  );

  bodies.push(body);
  World.add(world, body);
}

const start = store => next => action => {

  const {world} = mState;

  const ground = Bodies.rectangle(
    WIDTH / 2,
    HEIGHT + 40,
    WIDTH,
    50,
    {
      isStatic: true
    }
  );

  window.ground = ground;
  World.add(world, ground);

  window.requestAnimationFrame(() => loop(store)(next)(action));
}

const loop = store => next => action => {
  const currentEmoji = store.getState().config.current;
  let toneMap = createToneMap();

  let isRemoved = false;

  mState.bodies = mState.bodies.filter(body => {

    let {position} = body;

    let r = Math.floor(position.y / HEIGHT * ROW_COUNT);
    let c = Math.floor(position.x / WIDTH * COL_COUNT);

    for(var i = 0; i < 5; i++) {
      toneMap = addTone(
        toneMap,
        r - i, c - i,
        i * 2 + 1, i * 2 + 1
      );
    }

    if (
      position.x < 0 - 20 || WIDTH + 20 < position.x
      || position.y < 0 - 20 || HEIGHT + 20 < position.y
    ) {
      World.remove(mState.world, body);
      isRemoved = true;
      return false;
    }

    return true;
  });

  if (isRemoved) {
    addRectangle();
  }

  next({
    type: 'EMOJI_MAP/SET',
    payload: {
      emojiMap: createEmojiMap(toneMap, currentEmoji),
    }
  })

  window.requestAnimationFrame(() => loop(store)(next)(action));
}

const physical = store => next => action => {

  if (action.type === 'WORLD/INIT') {
    let engine = Engine.create();
    let world = engine.world;
    let bodies = [];
    mState.engine = engine;
    mState.world = world;
    mState.bodies = bodies;
    Engine.run(engine);

    start(store)(next)(action);
  } if (action.type === 'WORLD/ADD') {
    addRectangle();
  }

  next(action);
}

export default physical;