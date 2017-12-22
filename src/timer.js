// Define standard pomodoro time
var pomoStandardTime = 25 * 60 * 1000;

// Connect to DOM
const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const resetBtn = document.querySelector(".resetBtn");
const minutesSpan = document.querySelector(".minutes");
const secondsSpan = document.querySelector(".seconds");
const millisecondsSpan = document.querySelector(".milliseconds");

// Initialize varz
var timeInterval, deadline;

// Set event listeners
playBtn.addEventListener("click", runTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", setTimer);

// Initialize page onload
(function init() {
  setTimer();
})();

// Set timer
function setTimer() {
  clearInterval(timeInterval);
  // Define "deadline" aka timer finish time
  deadline = new Date(Date.parse(new Date()) + pomoStandardTime);
  timerRefresh(deadline);
  console.log(deadline);
}

// Based on a future date, get remaining time (milliseconds)
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var seconds = Math.floor((t / 1000) % 60);

  return {
    total: t,
    minutes: minutes,
    seconds: seconds
  };
}

// Refresh timer every 100th second with current countdown
function timerRefresh(deadline) {
  // Set initial milliseconds counter
  let milliseconds = 100;

  let t = getTimeRemaining(deadline);

  minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
  secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
  millisecondsSpan.innerHTML = ("0" + milliseconds).slice(-2);
  milliseconds === 0 ? (milliseconds = 99) : milliseconds--;

  if (t.total <= 0) {
    clearInterval(timeInterval);
  }
}

function runTimer() {
  // Define "deadline" aka timer finish time
  deadline = new Date(Date.parse(new Date()) + pomoStandardTime);

  timerRefresh(deadline);
  timeInterval = setInterval(function() {
    timerRefresh(deadline);
  }, 10);
}

function pauseTimer() {
  let t = getTimeRemaining(deadline);
  clearInterval(timeInterval);
  deadline = t.total;
  console.log(deadline);
}
