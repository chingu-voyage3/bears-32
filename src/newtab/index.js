import $ from 'jquery';
import 'jquery-ui-bundle';

import './style/app.css';

import './store';
import { initEventsHandler } from './events-handler';
import './background-image';
import './todolist/todolist';
import './timer';

initEventsHandler();

$(function() {
  $('#todolist-container').sortable();
});
