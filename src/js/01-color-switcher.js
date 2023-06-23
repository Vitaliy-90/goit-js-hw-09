const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyChange = document.querySelector('body');

const KEY_TIMER = 1000;
let timerId = null;
stopBtn.setAttribute('disabled', true);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');
  timerId = setInterval(() => {
    bodyChange.style.backgroundColor = getRandomHexColor();
  }, KEY_TIMER);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', true);
});
