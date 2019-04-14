const { drawCanvas } = require('./drawCanvas');
const { drawSpace } = require('./drawSpace');
const { drawShip } = require('./drawShip');

function draw () {
  drawCanvas();
  drawSpace();
  drawShip();
}

module.exports = { draw };
