const {
  COMMAND_LEFT,
  COMMAND_RIGHT,
  COMMAND_UP,
  COMMAND_DOWN
} = require('../../consts');
const { toRadians } = require('../../utils');
const { getEngineState } = require('../../engineState');
const { getGameState } = require('../../gameState');

const shipAnglesByDirection = {
  [COMMAND_LEFT]: toRadians(270),
  [COMMAND_RIGHT]: toRadians(90),
  [COMMAND_UP]: toRadians(0),
  [COMMAND_DOWN]: toRadians(180)
};

function drawShip () {
  const { canvasEl, context, currentCommand } = getEngineState();
  const { ship } = getGameState();

  const { width, height } = canvasEl;

  const size = 115;
  const x = (width / 2) - (size / 2);
  const y = (height / 2) - (size / 2);

  const image = new Image();
  image.src = '/images/ship.png';

  const angle = shipAnglesByDirection[ship.direction];

  context.shadowBlur = 6;
  context.shadowColor = '#0ff';
  context.fillStyle = 'rgba(0,255,255,0.4)';

  const thrusterSize = 10;
  const thrusterLength = 15;

  // Thruster light
  if (ship.energy > 0 && ship.fuel > 0) {
    if (currentCommand === COMMAND_LEFT) {
      context.fillRect(
        x + size,
        y + (size / 2) - (thrusterSize / 2),
        thrusterLength,
        thrusterSize
      );
    }
    else if (currentCommand === COMMAND_RIGHT) {
      context.fillRect(
        x - thrusterLength,
        y + (size / 2) - (thrusterSize / 2),
        thrusterLength,
        thrusterSize
      );
    }
    else if (currentCommand === COMMAND_UP) {
      context.fillRect(
        x + (size / 2) - (thrusterSize / 2),
        y + size,
        thrusterSize,
        thrusterLength
      );
    }
    else if (currentCommand === COMMAND_DOWN) {
      context.fillRect(
        x + (size / 2) - (thrusterSize / 2),
        y - thrusterLength,
        thrusterSize,
        thrusterLength
      );
    }
  }

  // Image
  context.shadowBlur = 0;
  context.translate(width / 2, height / 2);
  context.rotate(angle);
  context.drawImage(image, -size / 2, -size / 2, size, size);
  context.translate(-width / 2, -height / 2);
  context.rotate(-angle);
}

module.exports = { drawShip };
