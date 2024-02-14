function addTask() {
    const taskText = document.getElementById("new-task").value;
    if (taskText.trim() === "") return;

    const taskList = document.getElementById("task-list");

    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskDiv.appendChild(taskSpan);

    const editButton = createButton("Edit", "edit", editTask);
    const deleteButton = createButton("Delete", "delete", deleteTask);
    const doneButton = createButton("Done", "done", doneTask);

    taskDiv.appendChild(editButton);
    taskDiv.appendChild(deleteButton);
    taskDiv.appendChild(doneButton);

    taskList.appendChild(taskDiv);

    saveTasksToLocalStorage();
    document.getElementById("new-task").value = "";
}

function createButton(text, className, onclickFunction) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = className;
    button.onclick = onclickFunction;
    return button;
}

function editTask() {
    const taskSpan = this.parentNode.querySelector("span");
    const newTaskText = prompt("Edit task:", taskSpan.textContent);

    if (newTaskText !== null) {
        taskSpan.textContent = newTaskText;
        saveTasksToLocalStorage();
    }
}

function deleteTask() {
    this.parentNode.remove();
    saveTasksToLocalStorage();
}

function doneTask() {
    this.parentNode.style.textDecoration = "line-through";
    this.parentNode.style.opacity = "0.7";
    this.parentNode.querySelector(".edit").disabled = true;
    this.parentNode.querySelector(".done").disabled = true;
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const tasks = [];
    const taskList = document.getElementById("task-list").children;

    for (const taskDiv of taskList) {
        const task = {
            text: taskDiv.querySelector("span").textContent,
            bgColor: taskDiv.style.backgroundColor,
            isDone: taskDiv.style.textDecoration === "line-through",
        };
        tasks.push(task);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    for (const task of tasks) {
        const taskList = document.getElementById("task-list");

        const taskDiv = document.createElement("div");
        taskDiv.className = "task";
        taskDiv.style.backgroundColor = task.bgColor;

        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;
        taskDiv.appendChild(taskSpan);

        const editButton = createButton("Edit", "edit", editTask);
        const deleteButton = createButton("Delete", "delete", deleteTask);
        const doneButton = createButton("Done", "done", doneTask);

        taskDiv.appendChild(editButton);
        taskDiv.appendChild(deleteButton);
        taskDiv.appendChild(doneButton);

        if (task.isDone) {
            taskDiv.style.textDecoration = "line-through";
            taskDiv.style.opacity = "0.7";
            taskDiv.querySelector(".edit").disabled = true;
            taskDiv.querySelector(".done").disabled = true;
        }

        taskList.appendChild(taskDiv);
    }
}

// Load tasks from local storage on page load
loadTasksFromLocalStorage();