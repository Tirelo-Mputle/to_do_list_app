// import { toDoList } from "./scripts.js";
const toDoListUl = document.querySelector(".to_do_list");
const toDoInput = document.querySelector(".to_do_input");
const toDoListItem = document.createElement("li");

//to do list
export let toDoList = [];

export const makeLi = () => {
  //get info from input field
  let currentTodo = toDoInput.value;
  //push currentTodo into toDoList
  toDoList.push(currentTodo);
  // create list item
  let toDoListItem = document.createElement("li");
  toDoListItem.innerText = currentTodo;
  //Append the list item to the HTML list.
  toDoListUl.appendChild(toDoListItem);
  //clear input field
  toDoInput.value = "";
};
