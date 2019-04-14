const { getEngineState } = require('../../engineState');

function renderCanvas () {
  const { canvasEl, mainEl } = getEngineState();

  canvasEl.width = mainEl.offsetWidth;
  canvasEl.height = mainEl.offsetHeight;
}

module.exports = { renderCanvas };
