const { TILE_WIDTH, TILE_HEIGHT } = require('../../consts');
const { getEngineState } = require('../../engineState');
const { getGameState } = require('../../gameState');

function drawSpace () {
  const { canvasEl, context } = getEngineState();
  const { ship } = getGameState();

  const { width, height } = canvasEl;

  const offsetX = ship.x - (width / 2);
  const offsetY = ship.y - (height / 2);

  // Create a grif of 8x5 tiles.
  new Array(8).fill(0).forEach((_a, indexW) => {
    new Array(5).fill(0).forEach((_b, indexH) => {
      const imgX = indexW * TILE_WIDTH - offsetX;
      const imgY = indexH * TILE_HEIGHT - offsetY;

      const isOutInW = imgX + TILE_WIDTH < 0 || imgX > width;
      const isOutInH = imgY + TILE_HEIGHT < 0 || imgY > height;

      if (isOutInW || isOutInH) {
        return;
      }

      const img = new Image();
      img.src = `/images/tiles/${indexH}/${indexW}.jpg`;

      context.drawImage(
        img,
        0, 0, TILE_WIDTH, TILE_HEIGHT,
        imgX, imgY, TILE_WIDTH, TILE_HEIGHT
      );
    });
  });
}

module.exports = { drawSpace };
