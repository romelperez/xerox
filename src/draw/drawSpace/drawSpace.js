const { getEngineState } = require('../../engineState');
const { getGameState } = require('../../gameState');

function drawSpace () {
  const { canvasEl, context } = getEngineState();
  const { ship } = getGameState();

  const { width, height } = canvasEl;

  const tileWidth = 500;
  const tileHeight = 500;

  const offsetX = ship.x - (width / 2);
  const offsetY = ship.y - (height / 2);

  // Create a grif of 8x5 tiles.
  new Array(8).fill(0).forEach((_a, indexW) => {
    new Array(5).fill(0).forEach((_b, indexH) => {
      const imgX = indexW * tileWidth - offsetX;
      const imgY = indexH * tileHeight - offsetY;

      const isOutInW = imgX + tileWidth < 0 || imgX > width;
      const isOutInH = imgY + tileHeight < 0 || imgY > height;

      if (isOutInW || isOutInH) {
        return;
      }

      const img = new Image();
      img.src = `/images/tiles/${indexH}/${indexW}.jpg`;

      context.drawImage(
        img,
        0, 0, tileWidth, tileHeight,
        imgX, imgY, tileWidth, tileHeight
      );
    });
  });
}

module.exports = { drawSpace };
