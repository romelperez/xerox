const mainEl = document.querySelector('#main');
const canvasEl = document.querySelector('#canvas');

const engineState = {
  context: null,
  nextFrame: null,
  lastFrames: [],
  currentCommand: ''
};

const gameState = {
  ship: {
    x: 2000,
    y: 1250,
    energy: 3200,
    fuel: 440
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
  const { currentCommand } = engineState;
  const isWorking = !!currentCommand;

  const movementFactor = lastProgress * 0.25;
  const energyFactor = lastProgress * 0.07;
  const fuelFactor = lastProgress * 0.01;

  let { x, y, energy, fuel } = gameState.ship;

  energy = Math.max(energy - energyFactor, 0);

  if (energy > 0 && fuel > 0) {
    if (currentCommand === 'left') {
      x -= movementFactor;
    } else if (currentCommand === 'right') {
      x += movementFactor;
    } else if (currentCommand === 'up') {
      y -= movementFactor;
    } else if (currentCommand === 'down') {
      y += movementFactor;
    }

    if (isWorking) {
      fuel = Math.max(fuel - fuelFactor, 0);
    }
  }

  gameState.ship.x = x;
  gameState.ship.y = y;
  gameState.ship.energy = energy;
  gameState.ship.fuel = fuel;
}

function renderCanvas () {
  canvasEl.width = mainEl.offsetWidth;
  canvasEl.height = mainEl.offsetHeight;
}

function renderFPS () {
  const statsEl = document.querySelector('#stats');
  const fpsEl = statsEl.querySelector('.stats__fps');
  const barsEl = statsEl.querySelector('.stats__bars');
  const { fps, fpss } = getRate();

  const barsHTML = fpss
    // Maximum FPS is 60.
    .map(fps => Math.round(Math.min(60, fps)))
    // Get the FPS percentage to set the bar element's height.
    .map(fps => (fps / 60) * barsEl.offsetHeight)
    .map(barHeight => `<i class="stats__bar" style="height: ${barHeight}px"></i>`)
    .join('');

  fpsEl.innerHTML = `<b>${Math.round(fps)}</b> FPS`;
  barsEl.innerHTML = barsHTML;
}

function renderPosition () {
  const positionEl = document.querySelector('#position');
  const { x, y } = gameState.ship;

  positionEl.innerHTML = `
    <div>X: <b>${Math.round(x)}</b></div>
    <div>Y: <b>${Math.round(y)}</b></div>
  `;
}

function renderStatus () {
  const statusEl = document.querySelector('#status');
  const { ship } = gameState;

  let status = 'OK';
  if (ship.energy < 1000) {
    status = 'ENERGY LOW';
  } else if (ship.fuel < 200) {
    status = 'FUEL LOW';
  }

  statusEl.innerHTML = `
    <div>Command: <b>${engineState.currentCommand || 'hold'}</b></div>
    <div>Status: <b>${status}</b></div>
  `;
}

function renderResources () {
  const resourcesEl = document.querySelector('#resources');
  const { energy, fuel } = gameState.ship;

  resourcesEl.innerHTML = `
    <div>Energy: <b>${Math.round(energy)}</b></div>
    <div>Fuel: <b>${Math.round(fuel)}</b></div>
  `;
}

function render () {
  renderCanvas();
  renderFPS();
  renderPosition();
  renderStatus();
  renderResources();
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

      engineState.context.drawImage(
        img,
        0, 0, tileWidth, tileHeight,
        imgX, imgY, tileWidth, tileHeight
      );
    });
  });
}

function drawShip () {
  const { context, currentCommand } = engineState;
  const { ship } = gameState;
  const isWorking = !!currentCommand;

  const { width, height } = canvasEl;
  const shipWidth = 40;
  const shipHeight = 40;
  const x = (width / 2) - (shipWidth / 2);
  const y = (height / 2) - (shipHeight / 2);

  // Thrusters
  context.shadowBlur = 10;
  context.shadowColor = '#0ff';
  context.fillStyle = 'rgba(0,255,255,0.2)';
  if (ship.energy > 0 && ship.fuel > 0) {
    if (currentCommand === 'left') {
      context.fillRect(x + shipWidth, y + (shipHeight / 4), shipWidth / 4, (shipHeight / 2));
    } else if (currentCommand === 'right') {
      context.fillRect(x - (shipWidth / 4), y + (shipHeight / 4), shipWidth / 4, (shipHeight / 2));
    } else if (currentCommand === 'up') {
      context.fillRect(x + (shipWidth / 4), y + shipHeight, shipWidth / 2, (shipHeight / 4));
    } else if (currentCommand === 'down') {
      context.fillRect(x + (shipWidth / 4), y - (shipHeight / 4), shipWidth / 2, (shipHeight / 4));
    }
  }

  // Exterior
  context.shadowBlur = 2;
  context.shadowColor = '#099';
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

function draw () {
  const { width, height } = canvasEl;

  engineState.context.clearRect(0, 0, width, height);

  drawSpace();
  drawShip();
}

function loop (timestamp) {
  engineState.lastFrames = [timestamp, ...engineState.lastFrames].slice(0, 100);

  update();
  render();
  draw();

  engineState.nextFrame = window.requestAnimationFrame(loop);
}

function getKeyboardCommand (code) {
  switch (event.which) {
    // a, d, w, s arrow keys.
    case 97: return 'left';
    case 100: return 'right';
    case 119: return 'up';
    case 115: return 'down';
    default: return '';
  }
}

function addEvents () {
  document.addEventListener('keypress', event => {
    const command = getKeyboardCommand(event.which);
    engineState.currentCommand = command;
  });

  document.addEventListener('keyup', () => {
    engineState.currentCommand = '';
  });

  canvasEl.addEventListener('touchstart', event => {
    const [{ clientX: x, clientY: y }] = event.changedTouches;
    const { width, height } = canvasEl;

    if (y > height / 3 && y < height * (2 / 3)) {
      if (x < width / 3) {
        engineState.currentCommand = 'left';
      } else if (x > width * (2 / 3)) {
        engineState.currentCommand = 'right';
      }
    }

    if (x > width / 3 && x < width * (2 / 3)) {
      if (y < height / 3) {
        engineState.currentCommand = 'up';
      } else if (y > height * (2 / 3)) {
        engineState.currentCommand = 'down';
      }
    }
  });

  document.addEventListener('touchend', () => {
    engineState.currentCommand = '';
  });
}

function start () {
  mainEl.style.opacity = 1;
  addEvents();
  engineState.context = canvasEl.getContext('2d');
  engineState.nextFrame = window.requestAnimationFrame(loop);
}

// eslint-disable-next-line
function stop () {
  window.cancelAnimationFrame(engineState.nextFrame);
}

setTimeout(start, 1000);
