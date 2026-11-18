const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    taskInput.value = "";
}

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function (task) {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.className = "task-text";

        if (task.completed) {
            span.classList.add("completed");
        }

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Done";
        completeBtn.className = "complete-btn";

        completeBtn.onclick = function () {
            toggleTask(task.id);
        };

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";

        editBtn.onclick = function () {
            editTask(task.id);
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.onclick = function () {
            deleteTask(task.id);
        };

        const actions = document.createElement("div");
        actions.className = "actions";

        actions.appendChild(completeBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);

        taskList.appendChild(li);

    });

    updateTaskCount();
}


function editTask(id) {

    const task = tasks.find(function (task) {
        return task.id === id;
    });

    const updatedText = prompt("Edit your task:", task.text);

    if (updatedText === null) {
        return;
    }

    if (updatedText.trim() === "") {
        alert("Task cannot be empty!");
        return;
    }

    task.text = updatedText.trim();

    saveTasks();
    displayTasks();
}

function toggleTask(id) {

    const task = tasks.find(function (task) {
        return task.id === id;
    });

    task.completed = !task.completed;

    saveTasks();
    displayTasks();
}


function deleteTask(id) {

    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    saveTasks();
    displayTasks();
}


function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


function updateTaskCount() {

    const total = tasks.length;

    const completed = tasks.filter(function (task) {
        return task.completed;
    }).length;

    taskCount.textContent =
        `Total Tasks: ${total} | Completed: ${completed}`;
}


displayTasks();


taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});