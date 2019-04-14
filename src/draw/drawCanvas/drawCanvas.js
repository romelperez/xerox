const { getEngineState } = require('../../engineState');

function drawCanvas () {
  const { canvasEl, context } = getEngineState();
  const { width, height } = canvasEl;

  context.clearRect(0, 0, width, height);
}

module.exports = { drawCanvas };
