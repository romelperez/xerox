const { renderCanvas } = require('./renderCanvas');
const { renderFPS } = require('./renderFPS');
const { renderPosition } = require('./renderPosition');
const { renderStatus } = require('./renderStatus');
const { renderResources } = require('./renderResources');

function render () {
  renderCanvas();
  renderFPS();
  renderPosition();
  renderStatus();
  renderResources();
}

module.exports = { render };
