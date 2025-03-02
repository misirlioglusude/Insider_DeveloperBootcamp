document
  .getElementById("taskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let title = document.getElementById("title").value.trim();
    let description = document.getElementById("description").value.trim();
    let priority = document.querySelector('input[name="priority"]:checked');
    let errorDiv = document.getElementById("error");

    if (!title) {
      errorDiv.textContent = "Başlık zorunludur.";
      return;
    }

    if (!priority) {
      errorDiv.textContent = "Lütfen bir öncelik seçin.";
      return;
    }

    errorDiv.textContent = "";

    let task = document.createElement("li");
    task.classList.add("task");
    task.dataset.priority = priority.value;

    task.innerHTML = `
    <div>
      <strong>${title}</strong>
      <p>${description}</p>
      <span>Öncelik: ${priority.value}</span>
    </div>
    <div>
      <button class="complete-btn">Tamamlandı</button>
      <button class="delete-btn">Sil</button>
    </div>
  `;

    task.addEventListener("click", function (event) {
      if (event.target.classList.contains("complete-btn")) {
        task.classList.toggle("completed");
      } else if (event.target.classList.contains("delete-btn")) {
        task.remove();
      }
    });

    document.getElementById("taskList").appendChild(task);
    document.getElementById("taskForm").reset();
  });

document
  .getElementById("filterCompleted")
  .addEventListener("click", function () {
    let tasks = document.querySelectorAll(".task");

    tasks.forEach((task) => {
      if (!task.classList.contains("completed")) {
        task.style.display = "none";
      } else {
        task.style.display = "flex";
      }
    });
  });

document.getElementById("sortPriority").addEventListener("click", function () {
  let taskList = document.getElementById("taskList");
  let tasks = Array.from(taskList.children);

  tasks.sort((a, b) => {
    let priorityOrder = { Düşük: 1, Orta: 2, Yüksek: 3 };
    return (
      priorityOrder[a.dataset.priority] - priorityOrder[b.dataset.priority]
    );
  });

  taskList.innerHTML = ""; 
  tasks.forEach((task) => taskList.appendChild(task)); 
});
