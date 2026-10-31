const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const taskError = document.getElementById("taskError");

let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

function saveTasks() {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
        const li = document.createElement("li");

        const leftDiv = document.createElement("div");
        leftDiv.className = "task-left";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        checkbox.addEventListener("change", function () {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(span);

        li.appendChild(leftDiv);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

function addNewTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        taskError.textContent = "Please enter a task.";
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskError.textContent = "";
}

addTask.addEventListener("click", addNewTask);

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addNewTask();
    }
});

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    document.querySelectorAll(".form-group small").forEach(function (error) {
        error.textContent = "";
    });

    document.getElementById("successMessage").textContent = "";

    if (name.length < 3) {
        document.getElementById("nameError").textContent = "Please enter at least 3 characters.";
        isValid = false;
    }

    if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Please enter a valid email address.";
        isValid = false;
    }

    if (subject.length < 3) {
        document.getElementById("subjectError").textContent = "Please enter a subject.";
        isValid = false;
    }

    if (message.length < 10) {
        document.getElementById("messageError").textContent = "Message must contain at least 10 characters.";
        isValid = false;
    }

    if (isValid) {
        document.getElementById("successMessage").textContent = "Your message has been submitted successfully!";
        contactForm.reset();
    }
});

displayTasks();