var taskInput = document.getElementsById("new-task-input");
var addButton = document.getElementsByTagName("button")[0];
var todolistHolder = document.getElementsById("todolist-container");

//New Task List item
var createNewTaskElement = function(taskString){
	//Create List Item
	var listItem = document.createElement("li");
	//input(checkbox)
	var checkBox = document.createElement("input");
	//label
	var label = document.createElement("label");
	//input(text) task name
	var editInput = document.createElement("input");
	//button.edit
	var editButton = document.createElement("button");
	//button.delete
	var deleteButton = document.createElement("button");

	checkBox.type = "checkbox";
	editInput.type = "text";

	editButton.innerText = "Edit";
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";

	label.innerText = taskString;

	//appending each element to listItem
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
}

// Add a new task
var addTask = function() {
	// Create a new list item with the text from #new-task-input
	var listItem = createNewTaskElement(taskInput.value);
	//append listItem to todolistHolder
	todolistHolder.appendChild(listItem);
	//update taskInput.value
	taskInput.value = "";
}

// Edit an existing task
var editTask = function(){
	var listItem = this.parentNode;
	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("label");

	var containsClass = listItem.classList.contains("editMode");

	if(containsClass){
		label.innerText = editInput.value;
	} else {
		editInput.value = label.innerText;
	}

	//Toggle .editMode on the parent
	listItem.classList.toggle("editMode");
}

// Delete an existing task
var deleteTask = function() {
	var listItem = this.parentNode;
	var ul = listItem.parentNode;

	//Remove the parent list item from the ul
	ul.removeChild(listItem);
}

