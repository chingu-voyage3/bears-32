import { createStore } from "../lib/store-factory";

const store = createStore();

export default store;

window.newTabStore = store;
