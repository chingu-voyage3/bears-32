const LOCAL_STORAGE_STORE_KEY = 'store';

export function saveStateInLocalStorage(state) {
  console.log('saved state', state);
  localStorage.setItem(LOCAL_STORAGE_STORE_KEY, JSON.stringify(state));
}

export function loadStateFromLocalStorage(store) {
  const stateString = localStorage.getItem(LOCAL_STORAGE_STORE_KEY);
  if (stateString) {
    const state = JSON.parse(stateString);
    store.setState(() => state);
  }
}
