const { getEngineState } = require('../../engineState');
const { getGameState } = require('../../gameState');

function renderResources () {
  const { mainEl } = getEngineState();
  const { ship } = getGameState();

  const { energy, fuel } = ship;

  let resourcesEl = mainEl.querySelector('.resources');
  if (!resourcesEl) {
    resourcesEl = document.createElement('div');
    resourcesEl.className = 'resources';
    mainEl.appendChild(resourcesEl);
  }

  resourcesEl.innerHTML = `
    <div>Energy: <b>${Math.round(energy)}</b></div>
    <div>Fuel: <b>${Math.round(fuel)}</b></div>
  `;
}

module.exports = { renderResources };
