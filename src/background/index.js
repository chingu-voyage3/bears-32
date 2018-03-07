import store from './store';
import { initEventsHandler } from './events-handler';

const LOCAL_STORAGE_STORE_KEY = 'store';

initEventsHandler();

store.subscribe(saveStateInLocalStorage);
loadStateFromLocalStorage();

function saveStateInLocalStorage(state) {
  localStorage.setItem(LOCAL_STORAGE_STORE_KEY, JSON.stringify(state));
}

function loadStateFromLocalStorage() {
  const stateString = localStorage.getItem(LOCAL_STORAGE_STORE_KEY);
  if (stateString) {
    const state = JSON.parse(stateString);
    store.setState(() => state);
  }
}
