import store from './store';
import { initEventsHandler } from './events-handler';
import {
  loadStateFromLocalStorage,
  saveStateInLocalStorage,
} from './local-storage';

initEventsHandler();

loadStateFromLocalStorage(store);
store.subscribe(saveStateInLocalStorage);
