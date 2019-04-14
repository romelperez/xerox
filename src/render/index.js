const { pipe } = require('../utils');
const { renderCanvas } = require('./renderCanvas');
const { renderFPS } = require('./renderFPS');
const { renderPosition } = require('./renderPosition');
const { renderStatus } = require('./renderStatus');
const { renderResources } = require('./renderResources');

const render = pipe(
  renderCanvas,
  renderFPS,
  renderPosition,
  renderStatus,
  renderResources
);

module.exports = { render };
