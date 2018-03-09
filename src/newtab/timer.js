import store from './store';
import { startTimer, stopTimer } from './actions';

let currentSession = null;

store.subscribe(state => {
  const { currentSessionId } = state.timer;
  // don't do anything if the session didn't change
  if (currentSession && currentSession.id === currentSessionId) {
    return;
  }
  // check if currentSessionId is valid
  if (!state.sessions.ids.includes(currentSessionId)) {
    return;
  }
  currentSession = state.sessions.byId[currentSessionId];
  runTimer();
});

// Connect to DOM
const playBtn = document.querySelector('.playBtn');
// const pauseBtn = document.querySelector('.pauseBtn');
const resetBtn = document.querySelector('.resetBtn');
const minutesSpan = document.querySelector('.minutes');
const secondsSpan = document.querySelector('.seconds');

// Set event listeners on buttons
playBtn.addEventListener('click', () => startTimer());
// pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', () => stopTimer());

// Initialize page onload
export function initTimer() {}

// Timer Helpers ------------------------------------------

// Based on a future date, get remaining time (centiseconds)
function getTimeRemaining(endtime) {
  // milliseconds
  const total = endtime - Date.now();

  const minutes = Math.floor((total / 1000 / 60) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return {
    total,
    minutes,
    seconds,
  };
}

// Timer Controls ------------------------------------------

function runTimer() {
  let timerRunning = setInterval(timerRefresh, 1000);
  timerRefresh();

  // Refresh timer every 100th second with current countdown
  function timerRefresh() {
    let { minutes, total, seconds } = getTimeRemaining(currentSession.end);
    minutesSpan.innerHTML = ('0' + minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + seconds).slice(-2);

    if (total <= 0) {
      clearInterval(timerRunning);
      timerRunning = null;
    }
  }
}
