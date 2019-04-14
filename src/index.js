const { getEngineState, updateEngineState } = require('./engineState');
const { update } = require('./update');
const { render } = require('./render');
const { draw } = require('./draw');
const { addUserEvents } = require('./user');

function loop (timestamp) {
  const engineState = getEngineState();
  const lastFrames = [timestamp, ...engineState.lastFrames].slice(0, 100);

  updateEngineState({ lastFrames });

  update();
  render();
  draw();

  const nextFrame = window.requestAnimationFrame(loop);
  updateEngineState({ nextFrame });
}

function start () {
  const mainEl = document.querySelector('#main');

  const canvasEl = document.createElement('canvas');
  canvasEl.className = 'canvas';
  mainEl.appendChild(canvasEl);

  mainEl.style.opacity = 1;

  updateEngineState({
    mainEl,
    canvasEl,
    context: canvasEl.getContext('2d'),
    nextFrame: window.requestAnimationFrame(loop)
  });

  addUserEvents();
}

// eslint-disable-next-line
function stop () {
  const { nextFrame } = getEngineState();
  window.cancelAnimationFrame(nextFrame);
}

setTimeout(start, 1000);
