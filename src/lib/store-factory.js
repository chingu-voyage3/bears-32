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
      //currentBackground: 'img/simon-migaj-494807-unsplash.jpg',
      currentBackground: 'img/darkness-347018-unsplash.jpg',
      backgrounds: {
        byId: {
          /*
          '1': {
            url: 'img/andrew-neel-109201.jpg',
            id: 1,
            // photographer: ,
            // photographerURL:
          },
          '2': {
            url: 'img/kelly-sikkema-455242.jpg',
            id: 2,
            // photographer: ,
            // photographerURL:
          },
          */
          '1': {
            url: 'img/darkness-347018-unsplash.jpg',
            id: 1,
            // photographer: ,
            // photographerURL:
          },
          '2': {
            url: 'img/igor-ovsyannykov-325822-unsplash.jpg',
            id: 2,
            // photographer: ,
            // photographerURL:
          },
          '5': {
            url: 'img/john-jason-428710-unsplash.jpg',
            id: 5,
            // photographer: ,
            // photographerURL:
          },
          '6': {
            url: 'img/mohammad-alizade-368770-unsplash.jpg',
            id: 6,
            // photographer: ,
            // photographerURL:
          },
          '7': {
            url: 'img/redd-angelo-344552-unsplash.jpg',
            id: 7,
            // photographer: ,
            // photographerURL:
          },
          '8': {
            url: 'img/simon-migaj-494807-unsplash.jpg',
            id: 8,
            // photographer: ,
            // photographerURL:
          },
          '9': {
            url: 'img/vincent-guth-358793-unsplash.jpg',
            id: 9,
            // photographer: ,
            // photographerURL:
          },
        },
        ids: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
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
