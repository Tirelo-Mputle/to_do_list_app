//ELEMENTS
const toDoForm = document.querySelector(".to_do_form");
const toDoListUl = document.querySelector(".to_do_list");
const toDoInput = document.querySelector(".to_do_input");
const submitButton = document.querySelector(".submit_button");
const footer = document.querySelector("footer");

//to do list
let toDoList = [];
let isEditing = false;
let currentTodo;
let currentEdit;

//prevents page from reloading when form is submitted
const handleForm = (e) => {
  e.preventDefault();
  //Add and display list item
  if (toDoInput.value === "") return;
  if (isEditing) {
    ReplaceEdit();
  } else {
    submitListItem();
  }
};
toDoForm.addEventListener("submit", handleForm);

const listItemData = (itemName, classAdded, todo) => {
  itemName.classList.add(`${classAdded}`);
  // itemName.innerText = todo.value;
  itemName.dataset.id = todo.id;
};
const editDeleteData = (itemName, classAdded, todo, text, handler) => {
  itemName.classList.add(`${classAdded}`);
  itemName.innerText = `${text}`;
  itemName.dataset.id = todo.id;
  itemName.addEventListener("click", handler);
};

const handleComplete = (e) => {
  toDoListUl.innerHTML = "";
  const newTodolist = toDoList.map((item, i) => {
    if (item.id === parseFloat(e.target.dataset.id)) {
      item = { ...item, completed: !item.completed };
      return item;
    } else return item;
  });
  toDoList = newTodolist;
  reRenderList();
};

const createListItem = (todo) => {
  // create list item
  const toDoItem = document.createElement("li");
  listItemData(toDoItem, "list_item", todo);
  //Append the list item to the ul element.
  toDoListUl.appendChild(toDoItem);

  // to do text and complete button container
  const textCompleteDiv = document.createElement("div");
  textCompleteDiv.classList.add("text_complete_div");
  toDoItem.appendChild(textCompleteDiv);

  //completed button
  const completed = document.createElement("button");
  completed.classList.add("complete_button");
  completed.dataset.id = todo.id;
  completed.innerHTML = todo.completed
    ? `<i class="fa-solid fa-square-check" data-id =${todo.id}></i>`
    : `<i class="fa-regular fa-square" data-id =${todo.id}></i>`;

  completed.addEventListener("click", handleComplete);
  textCompleteDiv.appendChild(completed);

  //to do text
  const todoText = document.createElement("span");
  todoText.innerText = todo.value;
  if (todo.completed) {
    todoText.classList.add("complete_strike_through");
  }
  textCompleteDiv.appendChild(todoText);

  //div containing edit and delete buttons
  const editDeleteDiv = document.createElement("div");
  editDeleteDiv.classList.add("edit_delete_div");
  toDoItem.appendChild(editDeleteDiv);

  //edit button
  const editButton = document.createElement("button");
  editDeleteData(editButton, "edit_button", todo, "edit", handleEdit);
  editDeleteDiv.appendChild(editButton);
  //delete button
  const deleteButton = document.createElement("button");
  editDeleteData(deleteButton, "delete_button", todo, "delete", handleDelete);
  editDeleteDiv.appendChild(deleteButton);

  //clear input field
  toDoInput.value = "";
};

const submitListItem = () => {
  //create currenTodo object
  currentTodo = {
    value: toDoInput.value,
    id: Math.random() * 1000,
    completed: false,
  };
  //push currentTodo into toDoList
  toDoList.push(currentTodo);
  createListItem(currentTodo);
};

const handleEdit = (e) => {
  isEditing = true;
  toggleSubmit();
  const newTodolist = toDoList.map((item, i) => {
    if (item.id === parseFloat(e.target.dataset.id)) {
      toDoInput.value = item.value;
      currentEdit = toDoList[i];
      return item;
    } else return item;
  });
  toDoList = newTodolist;
};

const ReplaceEdit = () => {
  toDoListUl.innerHTML = "";
  currentTodo = toDoInput.value;
  const newTodolist = toDoList.map((item, i) => {
    if (item === currentEdit) {
      item = { ...currentEdit, value: currentTodo };
      return item;
    } else return item;
  });
  toDoList = newTodolist;
  isEditing = false;
  toggleSubmit();
  toDoInput.value = "";
  toDoList.map((item) => {
    createListItem(item);
    return item;
  });
};

//Toggle submit button color
const toggleSubmit = () => {
  if (isEditing === false) {
    submitButton.classList.remove("submit_edit");
  } else if (isEditing === true) {
    submitButton.classList.add("submit_edit");
  }
};

const handleDelete = (e) => {
  toDoListUl.innerHTML = "";
  isEditing = false;
  toggleSubmit();
  toDoInput.value = "";
  const newTodolist = toDoList.filter((item, i) => {
    return item.id !== parseFloat(e.target.dataset.id);
  });
  toDoList = newTodolist;
  reRenderList();
};

const reRenderList = () => {
  const renderList = toDoList.map((item) => {
    createListItem(item);
    return item;
  });
  return renderList;
};
