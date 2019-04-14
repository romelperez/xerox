const {
  COMMAND_LEFT,
  COMMAND_RIGHT,
  COMMAND_UP,
  COMMAND_DOWN
} = require('../../consts');
const { getEngineState, getLastProgress } = require('../../engineState');
const { getGameState, updateGameShipState } = require('../../gameState');

function updateShip () {
  const { currentCommand } = getEngineState();
  const { ship } = getGameState();
  const lastProgress = getLastProgress();

  const isWorking = !!currentCommand;

  const movementFactor = lastProgress * 0.25;
  const energyFactor = lastProgress * 0.07;
  const fuelFactor = lastProgress * 0.01;

  let { x, y, energy, fuel, direction } = ship;

  energy = Math.max(energy - energyFactor, 0);

  if (energy > 0 && fuel > 0) {
    if (currentCommand === COMMAND_LEFT) {
      x -= movementFactor;
      direction = COMMAND_LEFT;
    }
    else if (currentCommand === COMMAND_RIGHT) {
      x += movementFactor;
      direction = COMMAND_RIGHT;
    }
    else if (currentCommand === COMMAND_UP) {
      y -= movementFactor;
      direction = COMMAND_UP;
    }
    else if (currentCommand === COMMAND_DOWN) {
      y += movementFactor;
      direction = COMMAND_DOWN;
    }

    if (isWorking) {
      fuel = Math.max(fuel - fuelFactor, 0);
    }
  }

  updateGameShipState({ x, y, energy, fuel, direction });
}

module.exports = { updateShip };
