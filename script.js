let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
            <div class="task-info">
                <strong>${task.name}</strong><br>
                <small>${task.date} ${task.time}</small>
            </div>
            <div class="actions">
                <button onclick="toggleComplete(${index})">✔</button>
                <button onclick="editTask(${index})">✏</button>
                <button onclick="deleteTask(${index})">🗑</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const name = document.getElementById("taskInput").value;
    const date = document.getElementById("taskDate").value;
    const time = document.getElementById("taskTime").value;
    if (name === "" || date === "" || time === "") {
        alert("Please fill all fields");
        return;
    }
    tasks.push({ name, date, time, completed: false, notified: false });
    saveTasks();
    renderTasks();
    document.getElementById("taskInput").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("taskTime").value = "";
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newName = prompt("Edit task:", tasks[index].name);
    if (newName !== null && newName.trim() !== "") {
        tasks[index].name = newName;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    if (confirm("Delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

function checkNotifications() {
    const now = new Date();
    tasks.forEach((task, index) => {
        if (!task.notified && !task.completed && task.date && task.time) {
            const taskDateTime = new Date(`${task.date}T${task.time}`);
            if (taskDateTime <= now) {
                alert(`Reminder: ${task.name}`);
                tasks[index].notified = true;
                saveTasks();
            }
        }
    });
}

renderTasks();
setInterval(checkNotifications, 1000);
