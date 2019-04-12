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

const SHIP_X_MS_RATE = 0.5;
const SHIP_Y_MS_RATE = 0.1;

function update () {
  const lastProgress = getLastProgress();

  const { width, height } = canvasEl;
  const xm = lastProgress * SHIP_X_MS_RATE;
  const ym = lastProgress * SHIP_Y_MS_RATE;

  let { x, y } = gameState.ship;

  x = x + xm > width ? 0 : x + xm;
  y = y + ym > height ? 0 : y + ym;

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

function draw () {
  const { width, height } = canvasEl;
  const { ship } = gameState;

  canvasCtx.clearRect(0, 0, width, height);
  canvasCtx.fillStyle = '#0ff';
  canvasCtx.fillRect(ship.x - 5, ship.y - 5, 10, 10);
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
setTimeout(stop, 3000);
