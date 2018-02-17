import store from './store';
import { addTodo } from './actions';

const taskInput = document.getElementById('new-task-input');
const addButton = document.getElementById('add-task-button');
const todolistHolder = document.getElementById('todolist-container');

// Set the click handler to the addTask function
// addButton.onclick = addTask;
addButton.addEventListener('click', handleAddTask);

handleStateChange(store.getState());

store.subscribe(handleStateChange);

function handleStateChange(state) {
  const todoIdList = state.todos.ids;
  const todosMap = state.todos.byId;
  const todos = todoIdList.map(id => todosMap[id]);
  updateTodoList(todos);
}

function handleAddTask() {
  addTodo(taskInput.value);
  // empty taskInput
  taskInput.value = '';
}

function updateTodoList(todos) {
  const todoElements = todos.map(todo => createNewTaskElement(todo.title));
  // Cycle over the incompleteTaskHolder ul list items
  for (let i = 0; i < todoElements.length; i++) {
    // bind events to list item's children (taskCompleted)
    bindTaskEvents(todoElements[i], taskCompleted);
    bindTaskEvents(todoElements[i], taskIncomplete);
    todolistHolder.appendChild(todoElements[i]);
  }
}

function createNewTaskElement(taskString) {
  // Create List Item
  const listItem = document.createElement('li');

  // input (checkbox)
  const checkBox = document.createElement('input'); // checkbox
  // label
  const label = document.createElement('label');
  // input (text)
  const editInput = document.createElement('input'); // text
  // button.edit
  const editButton = document.createElement('button');
  // button.delete
  const deleteButton = document.createElement('button');

  // Each element needs modifying

  checkBox.type = 'checkbox';
  editInput.type = 'text';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';

  label.innerText = taskString;

  // each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

// // Add a new task
// function addTask() {
//   // Create a new list item with the text from #new-task-input
//   const listItem = createNewTaskElement(taskInput.value);
//   // add listItem to the top of todolistHolder
//   todolistHolder.insertBefore(listItem, todolistHolder.childNodes[0]);
//   bindTaskEvents(listItem, taskCompleted);
//   // update taskInput.value
//   taskInput.value = '';
// }

// Edit an existing task
function editTask() {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');

  const containsClass = listItem.classList.contains('editMode');

  if (containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }

  // Toggle .editMode on the parent
  listItem.classList.toggle('editMode');
}

// Delete an existing task
function deleteTask() {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  // Remove the parent list item from the ul
  ul.removeChild(listItem);
}

function taskCompleted() {
  console.log('Task complete...');
  // Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  // move listItem to the bottom of the to do list
  moveToBottom(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

// Mark a task as incomplete
function taskIncomplete() {
  console.log('Task Incomplete...');
  // When checkbox is unchecked
  // Append the task list item #incomplete-tasks
  const listItem = this.parentNode;
  // move listItem to the top of the to do list
  moveToTop(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

function moveToTop(taskListItem) {
  // insert before list[0]
  todolistHolder.insertBefore(taskListItem, todolistHolder.childNodes[0]);
}
function moveToBottom(taskListItem) {
  // append to the last item of the to do list
  todolistHolder.appendChild(taskListItem);
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  console.log('Bind list item events');
  // select taskListItem's children
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  // bind editTask to edit button
  editButton.onclick = editTask;

  // bind deleteTask to delete button
  deleteButton.onclick = deleteTask;

  // bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
}
