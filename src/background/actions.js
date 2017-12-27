import store from "./store";
import { emit } from "../lib/events-emitter";
import {
  SESSION_CREATED,
  SESSION_UPDATED,
  TODO_CREATED
  // TODO_UPDATED,
} from "../lib/events";

let currentSessionId = 0;
let currentTodoId = 0;

/**
 * Start a new session for the timer
 * @param {number} todoId
 */
export function startTimer(todoId) {
  const now = new Date();
  const session = {
    start: now,
    end: new Date(now.getTime() + 25 * 60 * 1000),
    todoId,
    id: currentSessionId++
  };
  store.setState(state => ({
    ...state,
    sessions: {
      byId: {
        ...state.sessions.byId,
        [session.id]: session
      },
      ids: [...state.sessions.ids, session.id]
    }
  }));
  emit(SESSION_CREATED, session);
}

/**
 * Stops the timer for session with the supplied `sessionId`
 * @param {number} sessionId
 */
export function stopTimer(sessionId) {
  const session = store.getState().sessions.byId[sessionId];
  const updatedSession = {
    end: new Date(),
    ...session
  };
  store.setState(state => ({
    ...state,
    sessions: {
      ...state.sessions,
      byId: {
        ...state.sessions.byId,
        [sessionId]: updatedSession
      }
    }
  }));
  emit(SESSION_UPDATED, session);
}

/**
 * Add a todo with the supplied title
 * @param {string} title
 */
export function addTodo(title) {
  const todo = {
    title,
    id: currentTodoId++,
    expectedPomos: 0,
    sessions: []
  };
  store.setState(state => ({
    ...state,
    todos: {
      byId: {
        ...state.sessions.byId,
        [todo.id]: todo
      },
      ids: [...state.todos.ids, todo.id]
    }
  }));
  emit(TODO_CREATED, title);
}
