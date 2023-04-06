//ELEMENTS
const toDoForm = document.querySelector(".to_do_form");
const toDoListUl = document.querySelector(".to_do_list");
const toDoInput = document.querySelector(".to_do_input");

//to do list
let toDoList = [
  { value: "eggs", id: Math.random() * 1000 },
  { value: "butter", id: Math.random() * 1000 },
];

const isEditing = false;

let currentTodo;

const handleEdit = (e) => {
  const newTodolist = toDoList.map((item) => {
    if (item.id === parseFloat(e.target.dataset.id)) {
      toDoInput.value = item.value;
      item = { ...item, value: "new item" };
      return item;
    } else return item;
  });

  toDoList = newTodolist;
};
//get info from input field

const makeLi = () => {
  currentTodo = { value: toDoInput.value, id: Math.random() * 1000 };
  //push currentTodo into toDoList
  toDoList.push(currentTodo);
  // create list item
  const toDoListItem = document.createElement("li");
  toDoListItem.classList.add("listItem");
  toDoListItem.dataset.id = currentTodo.id;
  //Change inner text of li to current value of input field
  toDoListItem.innerText = currentTodo.value;
  //Append the list item to the HTML list.
  toDoListUl.appendChild(toDoListItem);
  //clear input field
  toDoInput.value = "";

  //Add handleEdit to list items
  toDoListItem.addEventListener("click", handleEdit);
};

//prevents page from reloading when form is submitted
const handleForm = (e) => {
  e.preventDefault();
  //Add and display list item
  makeLi();
};

toDoForm.addEventListener("submit", handleForm);
