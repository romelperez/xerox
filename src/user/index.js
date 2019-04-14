const { getEngineState, updateEngineState } = require('../engineState');
const { getKeyboardCommand, getCanvasTouchCommand } = require('../utils');

function addUserEvents () {
  const { canvasEl } = getEngineState();

  document.addEventListener('keypress', event => {
    const currentCommand = getKeyboardCommand(event.which);
    updateEngineState({ currentCommand });
  });

  document.addEventListener('keyup', () => {
    updateEngineState({ currentCommand: '' });
  });

  canvasEl.addEventListener('touchstart', event => {
    const [{ clientX: x, clientY: y }] = event.changedTouches;
    const { width, height } = canvasEl;

    const currentCommand = getCanvasTouchCommand({ width, height, x, y });
    updateEngineState({ currentCommand });
  });

  document.addEventListener('touchend', () => {
    updateEngineState({ currentCommand: '' });
  });
}

module.exports = { addUserEvents };
