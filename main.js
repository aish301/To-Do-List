const inputBox = document.getElementById("taskId");
const listContainer = document.getElementById("listContainer");
const addTaskbtn = document.getElementById("addButton");
const errorShow = document.getElementById("error");
const toast = document.getElementById("toast");

window.addEventListener("DOMContentLoaded", loadTasks);
addTaskbtn.addEventListener("click", addTask);

function addTask() {
  const task = inputBox.value.trim();

  if (task === "") {
    errorShow.innerText = "Task cannot be empty!";
    return;
  }

  let tasks = getTasksFromStorage();

  if (tasks.includes(task)) {
    errorShow.innerText = "Task already exists!";
    return;
  }

  errorShow.innerText = "";
  createTask(task);
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  inputBox.value = "";
  showToast("Task added successfully");
}

function createTask(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";

  const taskText = document.createElement("span");
  taskText.innerText = task;

  const editBtn = document.createElement("button");
  editBtn.innerText = "✏️";
  editBtn.className = "editBtn";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  deleteBtn.className = "deleteBtn";

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "actions";

  taskText.addEventListener("click", () => {
    taskText.classList.toggle("completed");
  });

  deleteBtn.addEventListener("click", () => {
    taskDiv.remove();
    removeFromStorage(task);
    showToast("Task deleted");
  });

  editBtn.addEventListener("click", () => {
    editTask(task, taskText);
  });

  actionsDiv.appendChild(editBtn);
  actionsDiv.appendChild(deleteBtn);

  taskDiv.appendChild(taskText);
  taskDiv.appendChild(actionsDiv);
  listContainer.appendChild(taskDiv);
}

function editTask(oldTask, taskTextElement) {
  const newTask = prompt("Edit your task", oldTask);

  if (!newTask || newTask.trim() === "") return;

  let tasks = getTasksFromStorage();

  if (tasks.includes(newTask)) {
    alert("Task already exists!");
    return;
  }

  taskTextElement.innerText = newTask;
  tasks = tasks.map(task => task === oldTask ? newTask : task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  showToast("Task updated successfully");
}

function getTasksFromStorage() {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
}

function removeFromStorage(task) {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getTasksFromStorage();
  tasks.forEach(task => createTask(task));
}

function showToast(message) {
  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
