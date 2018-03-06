import './todolist.css';

import store from '../store';

import { addTodo, deleteTodo, editTodo } from '../actions';

const taskInput = document.getElementById('new-task-input');
const addButton = document.getElementById('add-task-button');
const todolistHolder = document.getElementById('todolist-container');
const emptyMessageElement = document.querySelector('.empty-todolist');

// Set the click handler to the addTask function
addButton.addEventListener('click', handleAddTask);
taskInput.addEventListener('keyup', function handleKeyUp(event) {
  if (event.which === 13) {
    // if enter
    handleAddTask.call(this);
  }
});

handleStateChange(store.getState());

store.subscribe(handleStateChange);

function handleStateChange(state) {
  todolistHolder.innerHTML = '';
  const todoIdList = state.todos.ids;
  if (todoIdList.length) {
    hideEmptyMessage();
    const todosMap = state.todos.byId;
    const todos = todoIdList.map(id => todosMap[id]);
    updateTodoList(todos);
  } else {
    // no todos
    showEmptyMessage();
  }
}

function showEmptyMessage() {
  emptyMessageElement.removeAttribute('hidden');
}

function hideEmptyMessage() {
  emptyMessageElement.setAttribute('hidden', '');
}

function handleAddTask() {
  addTodo(taskInput.value);
  // empty taskInput
  taskInput.value = '';
}

function updateTodoList(todos) {
  const todoElements = todos.map(todo => createNewTaskElement(todo));
  // Cycle over the incompleteTaskHolder ul list items
  for (let i = 0; i < todoElements.length; i++) {
    // bind events to list item's children (taskCompleted)
    const element = todoElements[i];

    todolistHolder.appendChild(element);
  }
}

function createNewTaskElement({ title, id, completed }) {
  const element = createHtmlFromText(`
    <li class="task">
      <input class="checkbox" type="checkbox" ${completed ? 'checked' : ''}>
      <label class="label">${title}</label>
      <input class="title-input" type="text" value="${title}">
      <button class="edit">Edit</button>
      <button class="done">Done</button>
      <button class="delete">Delete</button>
    </li>
  `);

  bindTaskEvents(element, id);
  return element;
}

function createHtmlFromText(htmlText = '') {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlText;
  const element = tempDiv.firstElementChild;
  // TODO check if needs to delete the temp div somehow
  return element;
}

function bindTaskEvents(element, id) {
  const inputElement = element.querySelector('input.title-input');
  const labelElement = element.querySelector('.label');
  let originalValue = '';
  // bind editTask to edit button
  const editButton = element.querySelector('button.edit');
  editButton.addEventListener('click', onEditTask);

  // bind deleteTask to delete button
  const deleteButton = element.querySelector('button.delete');
  deleteButton.addEventListener('click', onDeleteTask);

  const doneEditButton = element.querySelector('button.done');
  doneEditButton.addEventListener('click', onDoneEdit);

  // bind checkBoxEventHandler to checkbox
  const checkBox = element.querySelector('input.checkbox');
  checkBox.addEventListener('change', toggleCheckbox);

  // Edit an existing task
  function onEditTask() {
    // Toggle .editMode on the parent
    element.classList.add('editMode');
    originalValue = inputElement.value;
  }

  // Delete an existing task
  function onDeleteTask() {
    deleteTodo(id);
  }

  function toggleCheckbox() {
    editTodo({ id, completed: checkBox.checked });
  }

  function onDoneEdit() {
    element.classList.remove('editMode');

    const newValue = inputElement.value;
    if (newValue !== originalValue) {
      labelElement.innerText = newValue;
      editTodo({ id, title: inputElement.value });
    }
  }
}
