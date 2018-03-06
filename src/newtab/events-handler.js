import { subscribe, initEventsManager } from '../lib/events-emitter';
import {
  SESSION_CREATED,
  SESSION_UPDATED,
  TODO_CREATED,
  TODO_UPDATED,
  BACKGROUND_CHANGED,
} from '../lib/events';
import store from './store';

export function initEventsHandler() {
  initEventsManager();
  subscribe(SESSION_CREATED, sessionCreated);
  subscribe(SESSION_UPDATED, sessionUpdated);
  subscribe(TODO_CREATED, todoCreated);
  subscribe(TODO_UPDATED, todoUpdated);
  subscribe(BACKGROUND_CHANGED, backgroundChanged);
}
function backgroundChanged({ url }) {
  store.setState(state => ({
    ...state,
    currentBackground: url,
  }));
}

function todoUpdated(todo) {
  store.setState(state => ({
    ...state,
    sessions: {
      byId: {
        ...state.sessions.byId,
        [todo.id]: todo,
      },
    },
  }));
}

function todoCreated(todo) {
  store.setState(state => ({
    ...state,
    todos: {
      byId: {
        ...state.todos.byId,
        [todo.id]: todo,
      },
      ids: [...state.todos.ids, todo.id],
    },
  }));
}

function sessionUpdated(session) {
  store.setState(state => ({
    ...state,
    sessions: {
      ...state.sessions,
      byId: {
        ...state.sessions.byId,
        [session.id]: session,
      },
    },
  }));
}

function sessionCreated(session) {
  store.setState(state => ({
    ...state,
    sessions: {
      ...state.sessions,
      byId: {
        ...state.sessions.byId,
        [session.id]: session,
      },
      ids: [...state.sessions.ids, session.id],
    },
  }));
}
