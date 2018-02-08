import $ from 'jquery';
import 'jquery-ui-bundle';

import './store';
import { initEventsHandler } from './events-handler';
import './background-image';
import './todolist';

initEventsHandler();

$(function() {
  $('#todolist-container').sortable();
});
