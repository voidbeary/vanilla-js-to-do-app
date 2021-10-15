export default function addToDo({ value, id }) {
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
