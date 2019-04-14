const { getEngineState } = require('../../engineState');
const { getGameState } = require('../../gameState');

function renderStatus () {
  const { mainEl, currentCommand } = getEngineState();
  const { ship } = getGameState();

  let statusEl = mainEl.querySelector('.status');
  if (!statusEl) {
    statusEl = document.createElement('div');
    statusEl.className = 'status';
    mainEl.appendChild(statusEl);
  }

  const command = currentCommand || 'HOLD';

  let status = 'OK';
  if (ship.energy < 1000) {
    status = 'ENERGY LOW';
  } else if (ship.fuel < 200) {
    status = 'FUEL LOW';
  }

  statusEl.innerHTML = `
    <div>Command: <b>${command}</b></div>
    <div>Status: <b>${status}</b></div>
  `;
}

module.exports = { renderStatus };
