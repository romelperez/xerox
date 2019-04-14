const { pipe } = require('../utils');
const { updateShip } = require('./updateShip');

const update = pipe(updateShip);

module.exports = { update };
