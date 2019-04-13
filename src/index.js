const mainEl = document.querySelector('#main');
const statsEl = document.querySelector('#stats');
const canvasEl = document.querySelector('#canvas');
const canvasCtx = canvasEl.getContext('2d');

const engineState = {
  nextFrame: null,
  lastFrames: []
};

const gameState = {
  ship: {
    x: 0,
    y: 0
  }
};

function getRate () {
  const progresses = engineState.lastFrames
    .map((currentTime, index, list) => {
      if (index === list.length - 1) {
        return 0;
      }

      const previousTime = list[index + 1];
      return currentTime - previousTime;
    })
    .filter(Boolean);

  const fpss = progresses.map(value => 1000 / value);
  const fps = fpss.length ? fpss.reduce((total, item) => total + item) / fpss.length : 0;

  return { progresses, fpss, fps };
}

function getLastProgress () {
  const [currentTime, lastTime] = engineState.lastFrames;
  return currentTime - lastTime || 0;
}

function update () {
  const lastProgress = getLastProgress();

  let { x, y } = gameState.ship;

  const mx = lastProgress * 0.43;
  const my = lastProgress * 0.26;

  x += mx;
  y += my;

  gameState.ship = { x, y };
}

function renderCanvas () {
  canvasEl.width = mainEl.offsetWidth;
  canvasEl.height = mainEl.offsetHeight;
}

function renderFPS () {
  const fpsEl = statsEl.querySelector('.stats__fps');
  const barsEl = statsEl.querySelector('.stats__bars');
  const { fps, fpss } = getRate();

  const barsHTML = fpss
    // Maximum FPS is 100.
    .map(fps => Math.round(Math.min(100, fps)))
    // Get the FPS percentage to set the bar element's height.
    .map(fps => (fps / 100) * barsEl.offsetHeight)
    .map(barHeight => `<i class="stats__bar" style="height: ${barHeight}px"></i>`)
    .join('');

  fpsEl.innerHTML = `${Math.round(fps)} FPS`;
  barsEl.innerHTML = barsHTML;
}

function render () {
  renderCanvas();
  renderFPS();
}

function drawSpace () {
  const { width, height } = canvasEl;
  const { ship } = gameState;

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

      canvasCtx.drawImage(
        img,
        0, 0, tileWidth, tileHeight,
        imgX, imgY, tileWidth, tileHeight
      );
    });
  });
}

function drawShip () {
  const { width, height } = canvasEl;
  const shipWidth = 20;
  const shipHeight = 10;

  canvasCtx.fillStyle = '#0ff';
  canvasCtx.fillRect(
    (width / 2) - shipWidth,
    (height / 2) - shipHeight,
    shipWidth,
    shipHeight
  );
}

function draw () {
  const { width, height } = canvasEl;

  canvasCtx.clearRect(0, 0, width, height);

  drawSpace();
  drawShip();
}

function loop (timestamp) {
  engineState.lastFrames = [timestamp, ...engineState.lastFrames].slice(0, 100);

  update();
  render();
  draw();

  gameState.nextFrame = window.requestAnimationFrame(loop);
}

function start () {
  mainEl.style.opacity = 1;
  gameState.nextFrame = window.requestAnimationFrame(loop);
}

function stop () {
  window.cancelAnimationFrame(gameState.nextFrame);
}

setTimeout(start, 1000);
setTimeout(stop, 10000);
