import { setState, getState } from "./store";

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
  setState(state => ({
    ...state,
    sessions: {
      byId: {
        ...state.sessions.byId,
        [session.id]: session
      },
      ids: [...state.sessions.ids, session.id]
    }
  }));
}

/**
 * Stops the timer for session with the supplied `sessionId`
 * @param {number} sessionId
 */
export function stopTimer(sessionId) {
  const session = getState().sessions.byId[sessionId];
  const updatedSession = {
    end: new Date(),
    ...session
  };
  setState(state => ({
    ...state,
    sessions: {
      ...state.sessions,
      byId: {
        ...state.sessions.byId,
        [sessionId]: updatedSession
      }
    }
  }));
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
  setState(state => ({
    ...state,
    todos: {
      byId: {
        ...state.sessions.byId,
        [todo.id]: todo
      },
      ids: [...state.todos.ids, todo.id]
    }
  }));
}
