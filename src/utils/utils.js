const {
  COMMAND_LEFT,
  COMMAND_RIGHT,
  COMMAND_UP,
  COMMAND_DOWN
} = require('../consts');

function getKeyboardCommand (code) {
  switch (code) {
    // a, d, w, s arrow keys.
    case 97: return COMMAND_LEFT;
    case 100: return COMMAND_RIGHT;
    case 119: return COMMAND_UP;
    case 115: return COMMAND_DOWN;
    default: return '';
  }
}

function getCanvasTouchCommand ({ width, height, x, y }) {
  if (y > height / 3 && y < height * (2 / 3)) {
    if (x < width / 3) {
      return COMMAND_LEFT;
    } else if (x > width * (2 / 3)) {
      return COMMAND_RIGHT;
    }
  }

  if (x > width / 3 && x < width * (2 / 3)) {
    if (y < height / 3) {
      return COMMAND_UP;
    } else if (y > height * (2 / 3)) {
      return COMMAND_DOWN;
    }
  }

  return '';
}

module.exports = { getKeyboardCommand, getCanvasTouchCommand };
