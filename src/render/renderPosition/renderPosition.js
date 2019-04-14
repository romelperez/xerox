const { getEngineState } = require('../../engineState');
const { getGameState } = require('../../gameState');

function renderPosition () {
  const { mainEl } = getEngineState();
  const { ship } = getGameState();

  const { x, y } = ship;

  let positionEl = mainEl.querySelector('.position');
  if (!positionEl) {
    positionEl = document.createElement('div');
    positionEl.className = 'position';
    mainEl.appendChild(positionEl);
  }

  positionEl.innerHTML = `
    <div>X: <b>${Math.round(x)}</b></div>
    <div>Y: <b>${Math.round(y)}</b></div>
  `;
}

module.exports = { renderPosition };
