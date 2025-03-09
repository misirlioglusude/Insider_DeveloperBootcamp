function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim();
  if (taskText === "") return;

  let li = document.createElement("li");

  let span = document.createElement("span");
  span.textContent = taskText;

  let buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  let completeButton = document.createElement("button");
  completeButton.textContent = "Done";
  completeButton.classList.add("complete");
  completeButton.onclick = function () {
    li.classList.toggle("completed");
  };

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete");
  deleteButton.onclick = function () {
    li.remove();
  };

  buttonContainer.appendChild(completeButton);
  buttonContainer.appendChild(deleteButton);

  li.appendChild(span);
  li.appendChild(buttonContainer);

  document.getElementById("taskList").appendChild(li);

  input.value = "";
}