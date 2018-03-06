import store from './store';
import { subscribe, initEventsManager, emit } from '../lib/events-emitter';

import {
  SESSION_CREATED,
  SESSION_UPDATED,
  TODO_CREATED,
  BACKGROUND_CHANGED,
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  START_TIMER,
  STOP_TIMER,
  CHANGE_BACKGROUND,
  GET_STORE,
  TODO_UPDATED,
  TODO_DELETED,
} from '../lib/events';

let currentSessionId = 0;
let currentTodoId = 0;

export function initEventsHandler() {
  initEventsManager();
  subscribe(ADD_TODO, addTodo);
  subscribe(EDIT_TODO, editTodo);
  subscribe(DELETE_TODO, deleteTodo);
  subscribe(START_TIMER, startTimer);
  subscribe(STOP_TIMER, stopTimer);
  subscribe(CHANGE_BACKGROUND, changeBackground);

  subscribe(GET_STORE, (_, sendResponse) => sendResponse(store.getState()));
}

/**
 * Start a new session for the timer
 * @param {number} todoId
 */
export function startTimer({ todoId }) {
  const now = new Date();
  const session = {
    start: now,
    end: new Date(now.getTime() + 25 * 60 * 1000),
    todoId,
    id: currentSessionId++,
  };
  store.setState(state => ({
    ...state,
    sessions: {
      byId: {
        ...state.sessions.byId,
        [session.id]: session,
      },
      ids: [...state.sessions.ids, session.id],
    },
  }));
  emit(SESSION_CREATED, { session });
}

/**
 * Stops the timer for session with the supplied `sessionId`
 * @param {number} sessionId
 */
export function stopTimer({ sessionId }) {
  const session = store.getState().sessions.byId[sessionId];
  const updatedSession = {
    end: new Date(),
    ...session,
  };
  store.setState(state => ({
    ...state,
    sessions: {
      ...state.sessions,
      byId: {
        ...state.sessions.byId,
        [sessionId]: updatedSession,
      },
    },
  }));
  emit(SESSION_UPDATED, { session });
}

/**
 * Add a todo with the supplied title
 * @param {string} title
 */
export function addTodo({ title }) {
  const todo = {
    title,
    id: currentTodoId++,
    expectedPomos: 0,
    sessions: [],
  };
  store.setState(state => ({
    ...state,
    todos: {
      byId: {
        ...state.sessions.byId,
        [todo.id]: todo,
      },
      ids: [...state.todos.ids, todo.id],
    },
  }));
  emit(TODO_CREATED, todo);
}

export function deleteTodo(id) {
  store.setState(state => ({
    ...state,
    todos: {
      byId: removeTodoFromById(state.todos.byId, id),
      ids: state.todos.ids.filter(todoId => todoId !== id),
    },
  }));
  emit(TODO_DELETED, id);
}

function removeTodoFromById(todoById, id) {
  const keys = Object.keys(todoById).filter(key => key !== id);
  const newState = keys.reduce((o, key) => {
    o[key] = todoById[key];
    return o;
  }, {});
  return newState;
}

export function editTodo(todo) {
  store.setState(state => ({
    ...state,
    todos: {
      ...state.todos,
      byId: {
        ...state.todos.byId,
        [todo.id]: { ...state.todos.byId[todo.id], ...todo },
      },
    },
  }));
  emit(TODO_UPDATED, todo);
}

export function changeBackground({ bgId }) {
  emit(BACKGROUND_CHANGED, store.getState().backgrounds.byId[bgId]);
}
