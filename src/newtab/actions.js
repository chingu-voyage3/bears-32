import { emit } from '../lib/events-emitter';

import {
  START_TIMER,
  STOP_TIMER,
  FINISH_SESSION,
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
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
 * Submits a description for a session as a finishing step
 * @param {number} sessionId
 * @param {string} description
 */
export function finishSession(sessionId, description) {
  emit(FINISH_SESSION, { sessionId, description });
}

/**
 * Add a todo with the supplied title
 * @param {string} title
 */
export function addTodo(title) {
  emit(ADD_TODO, { title });
}

export function deleteTodo(id) {
  emit(DELETE_TODO, id);
}

export function editTodo(todo) {
  emit(EDIT_TODO, todo);
}

export function setBackground(bgId) {
  emit(CHANGE_BACKGROUND, { bgId });
}
