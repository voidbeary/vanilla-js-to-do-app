const formElement = document.querySelector("form");
formElement.onsubmit = handleSubmit;

getToDos().forEach(addToDo);

function handleSubmit(e) {
  e.preventDefault();

  const newItemElement = e.target.elements["new-item"];

  const toDo = {
    value: newItemElement.value,
    id: `todo-${Date.now()}`,
  };

  newItemElement.value = "";

  addToDo(toDo);
  saveToDo(toDo);
}
function addToDo({ value, id }) {
  const newListItem = document.createElement("li");

  const newInputForListItem = document.createElement("input");
  newInputForListItem.onclick = handleClick;
  newListItem.appendChild(newInputForListItem);
  newListItem.append(value);
  newListItem.classList.add("list-group-item");
  newListItem.setAttribute("id", id);

  newInputForListItem.setAttribute("type", "checkbox");
  newInputForListItem.setAttribute("value", "");
  newInputForListItem.setAttribute("aria-label", "mark to do done");

  newInputForListItem.classList.add("form-check-input");
  newInputForListItem.classList.add("me-2");

  document.querySelector("ul").appendChild(newListItem);
}
function saveToDo(toDo) {
  const oldArr = getToDos();
  const newToDoArr = [...oldArr, toDo];
  localStorage.setItem("todos", JSON.stringify(newToDoArr));
}

function getToDos() {
  const toDosString = localStorage.todos || "[]";
  const toDos = JSON.parse(toDosString);
  return toDos;
}
function handleClick(e) {
  const element = e.target.parentElement;
  element.classList.add("animate__flipOutX");
  const handleAnimationEnd = () => {
    element.remove();
    removeToDo(element.id);
  };
  element.addEventListener("animationend", handleAnimationEnd);
}
function removeToDo(id) {
  const toDos = getToDos();
  const newToDos = toDos.filter((toDo) => toDo.id !== id);
  localStorage.setItem("todos", JSON.stringify(newToDos));
}
