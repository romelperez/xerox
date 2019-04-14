let state = Object.freeze({
  mainEl: null,
  canvasEl: null,
  context: null,
  nextFrame: null,
  lastFrames: [],
  currentCommand: ''
});

function getEngineState () {
  return state;
}

function getRate () {
  const progresses = state.lastFrames
    .map((currentTime, index, list) => {
      if (index === list.length - 1) {
        return 0;
      }

      const previousTime = list[index + 1];
      return currentTime - previousTime;
    })
    .filter(Boolean);

  const fpss = progresses.map(value => 1000 / value);
  const fps = fpss.length ? fpss.reduce((total, item) => total + item) / fpss.length : 0;

  return { progresses, fpss, fps };
}

function getLastProgress () {
  const [currentTime, lastTime] = state.lastFrames;
  return currentTime - lastTime || 0;
}

function updateEngineState (props) {
  state = Object.assign({}, state, props);
  state = Object.freeze(state);
}

module.exports = {
  getEngineState,
  getRate,
  getLastProgress,
  updateEngineState
};
