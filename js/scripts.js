import { makeLi } from "./toDoListItem.js";

//ELEMENTS
const toDoForm = document.querySelector(".to_do_form");

//prevents page from reloading when form is submitted
const handleForm = (e) => {
  e.preventDefault();

  makeLi();
};

toDoForm.addEventListener("submit", handleForm);
