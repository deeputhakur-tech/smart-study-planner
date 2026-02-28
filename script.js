const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");

let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const priority = document.getElementById("priority").value;
    const deadline = document.getElementById("deadline").value;

    if (taskInput.value === "") {
        alert("Please enter a task!");
        return;
    }

    const taskObj = {
        text: taskInput.value,
        priority: priority,
        deadline: deadline,
        completed: false
    };

    tasksArray.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));

    taskInput.value = "";
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    tasksArray.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <input type="checkbox" ${task.completed ? "checked" : ""}
                onchange="toggleComplete(${index})">
                <strong style="${task.completed ? 'text-decoration:line-through;color:gray;' : ''}">
                    ${task.text}
                </strong>
                <small>(${task.priority})</small>
                <small>${task.deadline}</small>
            </div>
            <button onclick="deleteTask(${index})">❌</button>
        `;

        taskList.appendChild(li);
    });

    updateProgress();
}

function toggleComplete(index) {
    tasksArray[index].completed = !tasksArray[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    renderTasks();
}

function deleteTask(index) {
    tasksArray.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    renderTasks();
}

function updateProgress() {
    const total = tasksArray.length;
    const completed = tasksArray.filter(task => task.completed).length;

    if (total === 0) {
        progressBar.style.width = "0%";
        return;
    }

    const percent = (completed / total) * 100;
    progressBar.style.width = percent + "%";
}

function filterTasks(type) {
    const items = document.querySelectorAll("#taskList li");

    items.forEach((item, index) => {
        const task = tasksArray[index];

        if (type === "all") {
            item.style.display = "flex";
        } else if (type === "completed") {
            item.style.display = task.completed ? "flex" : "none";
        } else if (type === "pending") {
            item.style.display = !task.completed ? "flex" : "none";
        }
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

renderTasks();