const inputBox = document.getElementById("taskId");
const listContainer = document.getElementById("listContainer");
const addTaskbtn = document.getElementById("addButton");
const errorShow = document.getElementById("error");
const toast = document.getElementById("toast");


window.addEventListener("DOMContentLoaded", loadTasks);


addTaskbtn.addEventListener("click", addTask);

function addTask() {
  let task = inputBox.value.trim();

  
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

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  deleteBtn.className = "deleteBtn";

  
  deleteBtn.addEventListener("click", () => {
    taskDiv.remove();
    removeFromStorage(task);
    showToast("Task deleted");
  });

  
  taskText.addEventListener("click", () => {
    taskText.classList.toggle("completed");
  });

  taskDiv.appendChild(taskText);
  taskDiv.appendChild(deleteBtn);
  listContainer.appendChild(taskDiv);
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
