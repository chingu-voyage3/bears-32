import $ from 'jquery';
import 'jquery-ui-bundle';

import './style/app.css';

import './store';
import { initEventsHandler } from './events-handler';
import './background-image';
import './todolist/todolist';
import { initTimer } from './timer/timer';

initEventsHandler();
initTimer();

$(function() {
  $('#todolist-container').sortable();
});
