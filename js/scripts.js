//ELEMENTS
const toDoForm = document.querySelector(".to_do_form");
const toDoListUl = document.querySelector(".to_do_list");
const toDoInput = document.querySelector(".to_do_input");
const submitButton = document.querySelector(".submit_button");

//to do list
let toDoList = [{ value: "oil", id: 5 }];
let isEditing = false;
let currentTodo;
let currentEdit;
toDoInput.value = "eggs";

//prevents page from reloading when form is submitted
const handleForm = (e) => {
  e.preventDefault();
  //Add and display list item
  if (isEditing) {
    ReplaceEdit();
  } else {
    submitListItem();
  }
};
toDoForm.addEventListener("submit", handleForm);

const createListItem = (todo) => {
  // create list item
  const toDoItem = document.createElement("li");
  toDoItem.classList.add("list_item");
  //Will use this id to edit and delete the item
  toDoItem.dataset.id = todo.id;
  toDoItem.innerText = todo.value;
  //Append the list item to the ul element.
  toDoListUl.appendChild(toDoItem);
  //Add handleEdit to list items!!!!!!!!!!!!
  // toDoItem.addEventListener("click", handleEdit);

  //div containing edit and delete buttons
  const editDeleteDiv = document.createElement("div");
  editDeleteDiv.classList.add("edit_delete_div");
  toDoItem.appendChild(editDeleteDiv);

  //edit button
  const editButton = document.createElement("button");
  editButton.classList.add("edit_button");
  editButton.innerText = "edit";
  editButton.dataset.id = todo.id;
  editButton.addEventListener("click", handleEdit);
  editDeleteDiv.appendChild(editButton);
  //delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete_button");
  deleteButton.innerText = "delete";
  deleteButton.dataset.id = todo.id;
  deleteButton.addEventListener("click", handleDelete);
  editDeleteDiv.appendChild(deleteButton);

  //clear input field
  toDoInput.value = "";
};

const submitListItem = () => {
  //create currenTodo object
  currentTodo = { value: toDoInput.value, id: Math.random() * 1000 };
  //push currentTodo into toDoList
  toDoList.push(currentTodo);
  createListItem(currentTodo);
};

const handleEdit = (e) => {
  isEditing = true;
  console.log(isEditing);
  toggleSubmit();
  console.log(e.target);
  console.log(e.target.parentNode.dataset.id);
  const newTodolist = toDoList.map((item, i) => {
    if (item.id === parseFloat(e.target.dataset.id)) {
      // if (item.id === parseFloat(e.target.dataset.id)) {
      toDoInput.value = item.value;
      currentEdit = toDoList[i];
      console.log(currentEdit);
      return item;
    } else return item;
  });

  toDoList = newTodolist;
  console.log(toDoList);
};

const ReplaceEdit = () => {
  toDoListUl.innerHTML = "";
  currentTodo = toDoInput.value;
  console.log(toDoList);
  console.log(currentTodo);

  const newTodolist = toDoList.map((item, i) => {
    console.log("are they eqyal", item === currentEdit);
    if (item === currentEdit) {
      item = { ...currentEdit, value: currentTodo };

      return item;
    } else return item;
  });

  toDoList = newTodolist;
  console.log(toDoList);
  isEditing = false;
  toggleSubmit();
  console.log(isEditing);
  toDoInput.value = "";

  toDoList.map((item) => {
    createListItem(item);
    return item;
  });
};

//Toggle submit color
const toggleSubmit = () => {
  if (isEditing === false) {
    submitButton.classList.remove("submit_edit");
  } else if (isEditing === true) {
    submitButton.classList.add("submit_edit");
  }
};

const handleDelete = (e) => {
  const removedTheOne = toDoList.filter((item, i) => {
    console.log(i, item);
    return item.id !== parseFloat(e.target.dataset.id - 1);
  });

  toDoList = removedTheOne;

  console.log(removedTheOne, "removeThis");
  console.log(toDoList, "todolist");
  toDoListUl.innerHTML = "";
  reRenderList();
};

const reRenderList = () => {
  const renderList = toDoList.map((item) => {
    const toDoListItem = document.createElement("li");
    toDoListItem.classList.add("listItem");
    toDoListItem.dataset.id = item.id;
    toDoListItem.innerText = item.value;
    toDoListUl.appendChild(toDoListItem);
    toDoListItem.addEventListener("click", handleEdit);
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.innerText = "delete";
    deleteBtn.dataset.id = item.id + 1;
    deleteBtn.addEventListener("click", deleteItem);
    //Append the list item to the HTML list.
    toDoListUl.appendChild(deleteBtn);
    //Add handleEdit to list items
    return item;
  });
  return reRenderList;
};

//get info from input field
submitListItem();

// const deleteBtn = document.createElement("button");
// deleteBtn.classList.add("delete");
// deleteBtn.dataset.id = currentTodo.id + 1;
// deleteBtn.innerText = "delete";
// toDoListUl.appendChild(deleteBtn);
// deleteBtn.addEventListener("click", deleteItem);
