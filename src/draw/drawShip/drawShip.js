const {
  COMMAND_LEFT,
  COMMAND_RIGHT,
  COMMAND_UP,
  COMMAND_DOWN
} = require('../../consts');
const { getEngineState } = require('../../engineState');
const { getGameState } = require('../../gameState');

function drawShip () {
  const { canvasEl, context, currentCommand } = getEngineState();
  const { ship } = getGameState();

  const isWorking = !!currentCommand;
  const { width, height } = canvasEl;

  const shipWidth = 40;
  const shipHeight = 40;
  const x = (width / 2) - (shipWidth / 2);
  const y = (height / 2) - (shipHeight / 2);

  // Thrusters
  context.shadowBlur = 10;
  context.shadowColor = '#0ff';
  context.fillStyle = 'rgba(0,255,255,0.25)';
  if (ship.energy > 0 && ship.fuel > 0) {
    if (currentCommand === COMMAND_LEFT) {
      context.fillRect(x + shipWidth, y + (shipHeight / 4), shipWidth / 4, (shipHeight / 2));
    } else if (currentCommand === COMMAND_RIGHT) {
      context.fillRect(x - (shipWidth / 4), y + (shipHeight / 4), shipWidth / 4, (shipHeight / 2));
    } else if (currentCommand === COMMAND_UP) {
      context.fillRect(x + (shipWidth / 4), y + shipHeight, shipWidth / 2, (shipHeight / 4));
    } else if (currentCommand === COMMAND_DOWN) {
      context.fillRect(x + (shipWidth / 4), y - (shipHeight / 4), shipWidth / 2, (shipHeight / 4));
    }
  }

  // Exterior
  context.shadowBlur = isWorking ? 6 : 0;
  context.shadowColor = '#0ff';
  context.fillStyle = '#099';
  context.fillRect(x, y, shipWidth, shipHeight);

  // Body
  context.shadowBlur = 0;
  context.fillStyle = '#444';
  context.fillRect(x + 1, y + 1, shipWidth - 2, shipHeight - 2);

  // Engines
  context.shadowBlur = isWorking ? 2 : 0;
  context.shadowColor = isWorking ? '#0ff' : '';
  context.fillStyle = isWorking ? '#0ff' : '#099';
  context.fillRect(x + 4, y + 4, shipWidth / 2, 1);
  context.fillRect(x + 4, y + 8, shipWidth / 2, 1);

  // Status
  const statusColor = ship.energy < 1000 || ship.fuel < 200 ? '#f00' : '#0ff';
  context.shadowBlur = 2;
  context.shadowColor = statusColor;
  context.fillStyle = statusColor;
  context.fillRect(x + shipWidth - 8, y + shipHeight - 4, 8, 4);
}

module.exports = { drawShip };
