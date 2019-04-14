const { getEngineState, getRate } = require('../../engineState');

function renderFPS () {
  const { mainEl } = getEngineState();
  const { fps, fpss } = getRate();

  let fpsEl = mainEl.querySelector('.fps');
  if (!fpsEl) {
    fpsEl = document.createElement('div');
    fpsEl.className = 'fps';
    mainEl.appendChild(fpsEl);
  }

  const barsHTML = fpss
    // Maximum FPS is 60.
    .map(fps => Math.round(Math.min(60, fps)))
    // Get the FPS percentage to set the bar element's height.
    .map(fps => (fps / 60) * fpsEl.offsetHeight)
    .map(barHeight => `<i class="fps__bar" style="height: ${barHeight}px"></i>`)
    .join('');

  fpsEl.innerHTML = `
    <div class="fps__value"><b>${Math.round(fps)}</b> FPS</div>
    <div class="fps__bars">${barsHTML}</div>
  `;
}

module.exports = { renderFPS };
