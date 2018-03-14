import { subscribe, initEventsManager } from '../lib/events-emitter';
import {
  SESSION_CREATED,
  SESSION_UPDATED,
  TODO_CREATED,
  TODO_UPDATED,
  TODO_DELETED,
  BACKGROUND_CHANGED,
} from '../lib/events';
import store from './store';

export function initEventsHandler() {
  initEventsManager();
  subscribe(SESSION_CREATED, sessionCreated);
  subscribe(SESSION_UPDATED, sessionUpdated);
  subscribe(TODO_CREATED, todoCreated);
  subscribe(TODO_UPDATED, todoUpdated);
  subscribe(TODO_DELETED, todoDeleted);
  subscribe(BACKGROUND_CHANGED, backgroundChanged);
}
function backgroundChanged({ url }) {
  store.setState(state => ({
    ...state,
    currentBackground: url,
  }));
}

function todoUpdated(todo) {
  store.setState(state => {
    console.log(state.todos.byId[todo.id], todo);
    return {
      ...state,
      todos: {
        ...state.todos,
        byId: {
          ...state.todos.byId,
          [todo.id]: { ...state.todos.byId[todo.id], ...todo },
        },
      },
    };
  });
}

function todoDeleted(id) {
  store.setState(state => ({
    ...state,
    todos: {
      byId: removeTodoFromById(state.todos.byId, id),
      ids: state.todos.ids.filter(todoId => todoId !== id),
    },
  }));
}

function removeTodoFromById(todoById, id) {
  const keys = Object.keys(todoById).filter(key => key !== id);
  const newState = keys.reduce((o, key) => {
    o[key] = todoById[key];
    return o;
  }, {});
  return newState;
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

function sessionUpdated({ session }) {
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

function sessionCreated({ session }) {
  store.setState(state => ({
    ...state,
    timer: {
      ...state.timer,
      currentSessionId: session.id,
    },
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
