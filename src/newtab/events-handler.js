import { subscribe } from '../lib/events-emitter';
import {
  SESSION_CREATED,
  SESSION_UPDATED,
  TODO_CREATED,
  TODO_UPDATED,
} from '../lib/events';
import store from './store';

subscribe(SESSION_CREATED, session => {
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
});

subscribe(SESSION_UPDATED, session => {
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
});

subscribe(TODO_CREATED, todo => {
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
});

subscribe(TODO_UPDATED, todo => {
  store.setState(state => ({
    ...state,
    sessions: {
      byId: {
        ...state.sessions.byId,
        [todo.id]: todo,
      },
    },
  }));
});
