import { createStore } from '../lib/store-factory';
import { emit } from '../lib/events-emitter';
import { GET_STORE } from '../lib/events';
const store = createStore();
export default store;

syncStoreWithBackground();

window.newTabStore = store;

async function syncStoreWithBackground() {
  const state = await emit(GET_STORE);
  store.setState(oldState => ({ ...oldState, ...state }));
}
