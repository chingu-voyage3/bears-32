export function createStore() {
  const store = {
    state: {
      sessions: {
        byId: {},
        ids: [],
      },
      todos: {
        byId: {},
        ids: [],
      },
      currentUser: {},
      settings: {},
      timer: {
        currentSession: null,
      },
      currentBackground: 'img/kelly-sikkema-455242.jpg',
      backgrounds: [
        {
          url: 'img/andrew-neel-109201.jpg',
          // photographer: ,
          // photographerURL:
        },
        {
          url: 'img/kelly-sikkema-455242.jpg',
          // photographer: ,
          // photographerURL:
        },
      ],
    },
    subscribers: [],
  };

  return {
    getState,
    setState,
    subscribe,
    unsubscribe,
  };

  /**
   * Returns a copy of current state
   */
  function getState() {
    return { ...store.state };
  }

  /**
   * Sets a new state using the reducer
   * @param {(state) => any} reducer: A function that gets current state as a parameter and returns a manipulated state
   */
  function setState(reducer) {
    const newState = reducer(store.state);
    store.state = newState;
    stateUpdated(newState);
  }

  /**
   * Subscribes a method to run every time the state updates
   * @param {(state) => void} method
   */
  function subscribe(method) {
    store.subscribers.push(method);
  }

  /**
   * Unsubscribes the supplied method
   * @param {Function} method
   */
  function unsubscribe(method) {
    store.subscribers = store.subscribers.filter(sub => sub !== method);
  }

  /**
   * Applies subscribed methods to supplied state
   * @param {*} state
   */
  function stateUpdated(state) {
    store.subscribers.forEach(sub => sub(state));
  }
}
