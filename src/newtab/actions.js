import { emit } from '../lib/events-emitter';

import {
  START_TIMER,
  STOP_TIMER,
  ADD_TODO,
  CHANGE_BACKGROUND,
} from '../lib/events';

/**
 * Start a new session for the timer
 * @param {number} todoId
 */
export function startTimer(todoId) {
  emit(START_TIMER, { todoId });
}

/**
 * Stops the timer for session with the supplied `sessionId`
 * @param {number} sessionId
 */
export function stopTimer(sessionId) {
  emit(STOP_TIMER, { sessionId });
}

/**
 * Add a todo with the supplied title
 * @param {string} title
 */
export function addTodo(title) {
  emit(ADD_TODO, { title });
}

export function setBackground(bgId) {
  emit(CHANGE_BACKGROUND, { bgId });
}
