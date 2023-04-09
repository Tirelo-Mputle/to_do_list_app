//ELEMENTS
const toDoForm = document.querySelector(".to_do_form");
const toDoListUl = document.querySelector(".to_do_list");
const toDoInput = document.querySelector(".to_do_input");
const submitButton = document.querySelector(".to_do_submit_button");

//to do list
let toDoList = [];
let isEditing = false;
let currentTodo;
let currentEdit;

//Toggle submit color
const toggleSubmit = () => {
  if (isEditing === false) {
    submitButton.classList.remove("button_edit");
    submitButton.classList.add("button_add");
  } else if (isEditing === true) {
    submitButton.classList.add("button_edit");
  }
};

const handleEdit = (e) => {
  isEditing = true;
  console.log(isEditing);
  submitButton.classList.add("button_edit");
  const newTodolist = toDoList.map((item, i) => {
    if (item.id === parseFloat(e.target.dataset.id)) {
      toDoInput.value = item.value;
      currentEdit = toDoList[i];
      console.log(currentEdit);
      return item;
    } else return item;
  });

  toDoList = newTodolist;
};

const deleteItem = (e) => {
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
    const toDoListItem = document.createElement("li");
    toDoListItem.classList.add("listItem");
    toDoListItem.dataset.id = item.id;
    toDoListItem.innerText = item.value;
    toDoListUl.appendChild(toDoListItem);
    toDoListItem.addEventListener("click", handleEdit);
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.innerText = "delete";
    deleteBtn.dataset.id = currentTodo.id + 1;
    deleteBtn.addEventListener("click", deleteItem);
    //Append the list item to the HTML list.
    toDoListUl.appendChild(deleteBtn);
    //Add handleEdit to list items
    return item;
  });
};
//get info from input field

const createLi = () => {
  // create list item
  const toDoListItem = document.createElement("li");
  toDoListItem.classList.add("listItem");
  toDoListItem.dataset.id = currentTodo.id;
  //Change inner text of li to current value of input field
  toDoListItem.innerText = currentTodo.value;
  //Append the list item to the HTML list.
  toDoListUl.appendChild(toDoListItem);
  //Add handleEdit to list items
  toDoListItem.addEventListener("click", handleEdit);
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.dataset.id = currentTodo.id + 1;
  deleteBtn.innerText = "delete";
  toDoListUl.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", deleteItem);
};

const makeLi = () => {
  currentTodo = { value: toDoInput.value, id: Math.random() * 1000 };
  //push currentTodo into toDoList
  toDoList.push(currentTodo);

  createLi();
  //clear input field
  toDoInput.value = "";
};

//prevents page from reloading when form is submitted
const handleForm = (e) => {
  e.preventDefault();
  //Add and display list item
  if (isEditing) {
    ReplaceEdit();
  } else {
    makeLi();
  }
};

toDoForm.addEventListener("submit", handleForm);
