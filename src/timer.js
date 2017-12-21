function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var seconds = Math.floor((t / 1000) % 60);

  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeTimer(endtime) {
  var minutesSpan = document.querySelector('.minutes');
  var secondsSpan = document.querySelector('.seconds');
  var millisecondsSpan = document.querySelector('.milliseconds')
  var milliseconds = 99;

  function updateTimer() {
    var t = getTimeRemaining(endtime);

    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    millisecondsSpan.innerHTML = ('0' + milliseconds).slice(-2);
    milliseconds === 0 ? milliseconds = 99 : milliseconds--;

    if (t.total <= 0) {
      clearInterval(timeInterval);
    }
  }

  updateTimer();
  var timeInterval = setInterval(updateTimer, 10);
}

var pomoStandardTime = 25 * 60 * 1000;
var deadline = new Date(Date.parse(new Date()) + pomoStandardTime);
initializeTimer(deadline);
