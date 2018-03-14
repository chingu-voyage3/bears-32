import store from './store';
import { startTimer, stopTimer } from './actions';

// Connect to DOM
const playBtn = document.querySelector('.playBtn');
// const pauseBtn = document.querySelector('.pauseBtn');
const resetBtn = document.querySelector('.resetBtn');
const minutesSpan = document.querySelector('.minutes');
const secondsSpan = document.querySelector('.seconds');

let currentSession = null;
let timerRunningTimeout = null;

store.subscribe(state => {
  const { currentSessionId } = state.timer;

  if (!currentSessionId) {
    // hide the reset button
  }
  // check if currentSessionId is valid
  if (!state.sessions.ids.includes(currentSessionId)) {
    return;
  }

  currentSession = state.sessions.byId[currentSessionId];
});

// Set event listeners on buttons
playBtn.addEventListener('click', () => startTimer());
// pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', () => stopTimer(currentSession.id));

// Initialize page onload
export function initTimer() {
  runTimer();
}

// Timer Helpers ------------------------------------------

// Based on a future date, get remaining time (centiseconds)
function getTimeRemaining(endtime) {
  // milliseconds
  const total = endtime - Date.now();

  const minutes = total > 0 ? Math.floor((total / 1000 / 60) % 60) : 0;
  const seconds = total > 0 ? Math.floor((total / 1000) % 60) : 0;

  return {
    total,
    minutes,
    seconds,
  };
}

// Timer Controls ------------------------------------------

function runTimer() {
  timerRunningTimeout = setInterval(timerRefresh, 1000);
  timerRefresh();

  // Refresh timer every 100th second with current countdown
  function timerRefresh() {
    if (!currentSession) {
      return;
    }
    let { minutes, seconds, total } = getTimeRemaining(currentSession.end);
    // console.log(currentSession, minutes, total, seconds);
    if (total < 0) {
      // ask for what happend in this session...
    }

    minutesSpan.innerHTML = String(minutes).padStart(2, 0);
    secondsSpan.innerHTML = String(seconds).padStart(2, 0);
  }
}
