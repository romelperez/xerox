const { COMMAND_UP } = require('../consts');

let state = Object.freeze({
  ship: {
    x: 2000,
    y: 1250,
    energy: 2600,
    fuel: 440,
    direction: COMMAND_UP
  }
});

function getGameState () {
  return state;
}

function updateGameShipState (props) {
  state = Object.assign({}, state, {
    ship: Object.assign({}, state.ship, props)
  });
  state = Object.freeze(state);
}

module.exports = {
  getGameState,
  updateGameShipState
};
