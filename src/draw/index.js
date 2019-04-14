const { pipe } = require('../utils');
const { drawCanvas } = require('./drawCanvas');
const { drawSpace } = require('./drawSpace');
const { drawShip } = require('./drawShip');

const draw = pipe(
  drawCanvas,
  drawSpace,
  drawShip
);

module.exports = { draw };
