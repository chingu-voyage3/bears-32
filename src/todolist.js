var taskInput = document.getElementById('new-task-input');
var addButton = document.getElementById('add-task-button');
var todolistHolder = document.getElementById('todolist-container');

var createNewTaskElement = function(taskString) {
  //Create List Item
  var listItem = document.createElement('li');

  //input (checkbox)
  var checkBox = document.createElement('input'); // checkbox
  //label
  var label = document.createElement('label');
  //input (text)
  var editInput = document.createElement('input'); // text
  //button.edit
  var editButton = document.createElement('button');
  //button.delete
  var deleteButton = document.createElement('button');

  //Each element needs modifying

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
};

// Add a new task
var addTask = function() {
  // Create a new list item with the text from #new-task-input
  var listItem = createNewTaskElement(taskInput.value);
  //add listItem to the top of todolistHolder
  todolistHolder.insertBefore(listItem, todolistHolder.childNodes[0]);
  bindTaskEvents(listItem, taskCompleted);
  //update taskInput.value
  taskInput.value = '';
};

// Edit an existing task
var editTask = function() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('label');

  var containsClass = listItem.classList.contains('editMode');

  if (containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }

  //Toggle .editMode on the parent
  listItem.classList.toggle('editMode');
};

// Delete an existing task
var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  //Remove the parent list item from the ul
  ul.removeChild(listItem);
};

// Set the click handler to the addTask function
//addButton.onclick = addTask;
addButton.addEventListener('click', addTask);

var taskCompleted = function() {
  console.log('Task complete...');
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  //move listItem to the bottom of the to do list
  moveToBottom(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

// Mark a task as incomplete
var taskIncomplete = function() {
  console.log('Task Incomplete...');
  // When checkbox is unchecked
  // Append the task list item #incomplete-tasks
  var listItem = this.parentNode;
  //move listItem to the top of the to do list
  moveToTop(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var moveToTop = function(taskListItem) {
  //insert before list[0]
  todolistHolder.insertBefore(taskListItem, todolistHolder.childNodes[0]);
};
var moveToBottom = function(taskListItem) {
  //append to the last item of the to do list
  todolistHolder.appendChild(taskListItem);
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log('Bind list item events');
  //select taskListItem's children
  var checkBox = taskListItem.querySelector('input[type=checkbox]');
  var editButton = taskListItem.querySelector('button.edit');
  var deleteButton = taskListItem.querySelector('button.delete');

  //bind editTask to edit button
  editButton.onclick = editTask;

  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;

  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
};

// Cycle over the incompleteTaskHolder ul list items
for (var i = 0; i < todolistHolder.children.length; i++) {
  // bind events to list item's children (taskCompleted)
  bindTaskEvents(todolistHolder.children[i], taskCompleted);
}
// Cycle over the completeTaskHolder ul list items
for (var i = 0; i < todolistHolder.children.length; i++) {
  // bind events to list item's children (taskIncompleted)
  bindTaskEvents(todolistHolder.children[i], taskIncomplete);
}
