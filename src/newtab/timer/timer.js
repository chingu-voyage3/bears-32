import './timer.css';

import store from '../store';
import { startTimer, stopTimer, finishSession } from '../actions';

let currentSession = null;
let timerRunningTimeout = null;

const timerWrapper = document.querySelector('.timer');
// Connect to DOM
const playBtn = timerWrapper.querySelector('.playBtn');
// const pauseBtn = timerWrapper.querySelector('.pauseBtn');
const resetBtn = timerWrapper.querySelector('.resetBtn');
const minutesSpan = timerWrapper.querySelector('.minutes');
const secondsSpan = timerWrapper.querySelector('.seconds');
const descriptionInputElement = timerWrapper.querySelector(
  '.description input'
);
const descriptionSubmitButton = timerWrapper.querySelector(
  '.description button'
);
// const countdownElement = timerWrapper.querySelector('.countdown');

store.subscribe(handleStateChange);

// Set event listeners on buttons
playBtn.addEventListener('click', handlePlayTimer);
// pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', handleStopTimer);
descriptionSubmitButton.addEventListener('click', handleSubmitDescription);

export function initTimer() {
  runTimer();
}

function handleStateChange(state) {
  const { currentSessionId } = state.timer;
  if (!currentSessionId || !state.sessions.ids.includes(currentSessionId)) {
    resetTimer();

    return;
  }

  currentSession = state.sessions.byId[currentSessionId];
  if (isSessionFinished(currentSession)) {
    handleFinishedSession();
  }
}

function resetTimer() {
  currentSession = null;
  timerWrapper.classList.remove('finished');
}

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

function isSessionFinished({ start, end }) {
  return end <= Date.now();
}

function handleFinishedSession(session) {
  timerWrapper.classList.add('finished');
}

function handleSubmitDescription() {
  if (!currentSession) {
    return;
  }
  const description = descriptionInputElement.value;
  finishSession(currentSession.id, description);
}
