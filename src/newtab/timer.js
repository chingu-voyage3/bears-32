import store from './store';
import { startTimer, stopTimer } from './actions';

let currentSession = null;
let timerRunningTimeout = null;

store.subscribe(state => {
  const { currentSessionId } = state.timer;
  if (!currentSessionId || !state.sessions.ids.includes(currentSessionId)) {
    currentSession = null;
    return;
  }
  currentSession = state.sessions.byId[currentSessionId];
});

// Connect to DOM
const playBtn = document.querySelector('.playBtn');
// const pauseBtn = document.querySelector('.pauseBtn');
const resetBtn = document.querySelector('.resetBtn');
const minutesSpan = document.querySelector('.minutes');
const secondsSpan = document.querySelector('.seconds');

// Set event listeners on buttons
playBtn.addEventListener('click', handlePlayTimer);
// pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', handleStopTimer);

function handleStopTimer() {
  if (!currentSession) {
    return;
  }
  stopTimer(currentSession.id);
}

function handlePlayTimer() {
  if (currentSession) {
    return;
  }
  startTimer();
}

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
