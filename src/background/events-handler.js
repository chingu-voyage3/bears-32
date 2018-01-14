import { subscribe, initEventsManager } from '../lib/events-emitter';

import {
  ADD_TODO,
  START_TIMER,
  STOP_TIMER,
  CHANGE_BACKGROUND,
} from '../lib/events';

import { addTodo, startTimer, stopTimer, changeBackground } from './actions';

export function initEventsHandler() {
  initEventsManager();
  subscribe(ADD_TODO, addTodo);
  subscribe(START_TIMER, startTimer);
  subscribe(STOP_TIMER, stopTimer);
  subscribe(CHANGE_BACKGROUND, changeBackground);
}
