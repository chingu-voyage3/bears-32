// Define standard pomodoro time
var pomoStandardTime = 25 * 60 * 1000;
// Initialize varz
var timerRunning = false;
var milliseconds = 100;
var deadline;
var paused;

// Connect to DOM
const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const resetBtn = document.querySelector(".resetBtn");
const minutesSpan = document.querySelector(".minutes");
const secondsSpan = document.querySelector(".seconds");
const millisecondsSpan = document.querySelector(".milliseconds");

// Set event listeners on buttons
playBtn.addEventListener("click", runTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", setTimer);

// Initialize page onload
(function init() {
  setTimer();
})();

// Timer Helpers ------------------------------------------

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
function timerRefresh() {
  let t = getTimeRemaining(deadline);

  minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
  secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
  millisecondsSpan.innerHTML = ("0" + milliseconds).slice(-2);
  milliseconds === 0 ? (milliseconds = 100) : milliseconds--;

  if (t.total <= 0) {
    clearInterval(timerRunning);
  }
}

// Create new deadline based on time in milliseconds (t)
function setDeadline(t) {
  deadline = new Date(Date.parse(new Date()) + t);
}

// Timer Controls ------------------------------------------

// Set/reset timer
function setTimer() {
  // Reset timer if it's currently running
  if (timerRunning) {
    clearInterval(timerRunning);
  }

  // Reset timer status
  timerRunning = false;
  paused = false;
  milliseconds = 100;

  // Set deadline and display on page
  setDeadline(pomoStandardTime);
  timerRefresh();
}

function runTimer() {
  // Only proceed if timer isn't running
  if (timerRunning === false) {
    // Set the timer based on whether it's paused (midway through task)
    // or starting from the beginning
    if (paused === true) {
      setDeadline(deadline);
      paused = false;
    } else {
      setDeadline(pomoStandardTime);
    }

    // Start refreshing timer at increments of 100th of a second
    timerRefresh();
    timerRunning = setInterval(function() {
      timerRefresh();
    }, 10);
  }
}

function pauseTimer() {
  // Only activate pause if timer is running
  if (timerRunning) {
    // Calculate remaining time after pause
    let t = getTimeRemaining(deadline);
    deadline = t.total;

    // Pause timer
    clearInterval(timerRunning);
    timerRunning = false;
    paused = true;
  }
}
