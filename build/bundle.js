/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__background_image__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__timer__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__timer__);




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(2);


// Still deliberating on whether to use the Unsplash API, or just download
// a few photos for the extension. The latter will perform faster.
// const unsplashQuery = "https://api.unsplash.com/photos/random?collections=1490722" + "&client_id=" + config.unsplashAppId + "&orientation=landscape"

const backgroundImage = document.querySelector('.background');

// Build album for bg images, with img link and photographer credits
var backgroundAlbum = [
  {
    url: 'url("img/andrew-neel-109201.jpg")',
    // photographer: ,
    // photographerURL:
  },
  {
    url: 'url("img/kelly-sikkema-455242.jpg")',
    // photographer: ,
    // photographerURL:
  }
]

// Select random number for bg album array
let currentBg = Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* getRandom */])(backgroundAlbum.length);

// Insert background image into DOM
backgroundImage.style.backgroundImage = backgroundAlbum[currentBg].url;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getRandom;
// Returns a random number from 0 (inclusive) to n (exclusive)
function getRandom(n) {
  return Math.floor(Math.random() * n);
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);