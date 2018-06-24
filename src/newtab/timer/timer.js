import './timer.css';

import store from '../store';
import { startTimer, stopTimer, finishSession } from '../actions';
import format from 'date-fns/format';
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
const sessionsListElement = timerWrapper.querySelector('.pomos-list');

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
  handleSessionStateChange(state);
  handleSessionsListChange(state);
}

function handleSessionsListChange(state) {
  const sessions = state.sessions.ids.map(id => state.sessions.byId[id]);
  sessionsListElement.innerHTML = sessions
    .filter(s => isSessionFinished(s))
    .slice(10)
    .map(s => createSessionElementHtml(s))
    .join('');
}

function createSessionElementHtml(session) {
  return `
    <li class="session">
      <div class="session__start">${format(
        session.start,
        'YYYY-MM-DD HH:mm'
      )}</div>
      <div class="session__end">${format(session.end, 'YYYY-MM-DD HH:mm')}</div>
      <div class="session__description>${session.description}</div>
    </li>
  `;
}

function handleSessionStateChange(state) {
  const { currentSessionId } = state.timer;
  if (!currentSessionId || !state.sessions.ids.includes(currentSessionId)) {
    resetTimer();

    return;
  }

  currentSession = state.sessions.byId[currentSessionId];
  timerWrapper.classList.add('active');
  if (isSessionFinished(currentSession)) {
    handleFinishedSession();
  }
}

function resetTimer() {
  currentSession = null;
  timerWrapper.classList.remove('finished');
  timerWrapper.classList.add('inactive');
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
  timerWrapper.classList.add('active');
  timerWrapper.classList.remove('inactive');
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
