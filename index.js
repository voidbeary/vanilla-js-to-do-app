import addToDo from "./addToDo.js";
// if (navigator.serviceWorker) {
//   navigator.serviceWorker.register("/vanilla-js-to-do-app/service-worker.js");
// }
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
