//ELEMENTS
const toDoForm = document.querySelector(".to_do_form");
const toDoInput = document.querySelector(".to_do_input");

//to do list
const toDoList = [];

//prevents page from reloading when form is submitted
const handleForm = (e) => {
  e.preventDefault();
  //get info from input field
  const currentTodo = toDoInput.value;
  //push currentTodo into toDoList
  toDoList.push(currentTodo);
  console.log(toDoList);
};

toDoForm.addEventListener("submit", handleForm);
