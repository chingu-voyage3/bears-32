import { subscribe } from "../lib/events-emitter";

import { ADD_TODO, START_TIMER, STOP_TIMER } from "../lib/events";

import { addTodo, startTimer, stopTimer } from "./actions";

subscribe(ADD_TODO, addTodo);
subscribe(START_TIMER, startTimer);
subscribe(STOP_TIMER, stopTimer);
