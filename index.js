const formElement = document.querySelector("form");
formElement.onsubmit = handleSubmit;

getToDos().forEach(addToDo);

function handleSubmit(e) {
  e.preventDefault();

  const newItemElement = e.target.elements["new-item"];
  const toDoText = newItemElement.value;
  newItemElement.value = "";

  addToDo(toDoText);
  saveToDos(toDoText);
}
function addToDo(toDoText) {
  const newListItem = document.createElement("li");

  const newInputForListItem = document.createElement("input");
  newInputForListItem.onclick = handleClick;
  newListItem.appendChild(newInputForListItem);
  newListItem.append(toDoText);
  newListItem.classList.add("list-group-item");

  newInputForListItem.setAttribute("type", "checkbox");
  newInputForListItem.setAttribute("value", "");
  newInputForListItem.setAttribute("aria-label", "mark to do done");

  newInputForListItem.classList.add("form-check-input");
  newInputForListItem.classList.add("me-2");

  document.querySelector("ul").appendChild(newListItem);
}
function saveToDos(toDoText) {
  const oldArr = getToDos();
  const newToDoArr = [...oldArr, toDoText];
  localStorage.setItem("todos", JSON.stringify(newToDoArr));
}

function getToDos() {
  const toDosString = localStorage["todos"] || "[]";
  const toDos = JSON.parse(toDosString);
  return toDos;
}
function handleClick(e) {
  const element = e.target.parentElement;
  element.classList.add("animate__flipOutX");
  const handleAnimationEnd = () => {
    element.remove();
  };
  element.addEventListener("animationend", handleAnimationEnd);
}
