const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

const savedTodoJSON = localStorage.getItem("todos");
const savedTodos = savedTodoJSON ? JSON.parse(savedTodoJSON) : [];

for (const todo of savedTodos) {
    addTodoToList(todo);
}

function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText === "") return;

    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false,
    };

    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    addTodoToList(todo);
    todoInput.value = "";
}

//Görev tamamlamak için fonk.
function toggleComplete(id) {
    const todo = savedTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed; //0->1 , 1->0

    localStorage.setItem("todos", JSON.stringify(savedTodos));

    const todoElement = document.getElementById(id);
    todoElement.classList.toggle("completed", todo.completed);
}

//Görevi düzenlemek için fonk.
function editTodo(id) {
    const todo = savedTodos.find((todo) => todo.id === id);
    const newText = prompt("Görevi Düzenle", todo.text);
    if (newText !== "") {
        todo.text = newText.trim();

        localStorage.setItem("todos", JSON.stringify(savedTodos));

        const todoElement = document.getElementById(id);
        todoElement.querySelector("span").textContent = newText;
    }
}

//Görevi silmek için fonk.
function removeTodo(id) {
    const todoElement = document.getElementById(id);
    todoElement.style.animation = 'fadeOut 0.3s ease';

    setTimeout(() => {
        savedTodos.splice(savedTodos.findIndex(todo => todo.id === id), 1);

        localStorage.setItem("todos",JSON.stringify(savedTodos));
        todoElement.remove();

    }, 300);
}

//Listeye ekleme fonk.
function addTodoToList(todo) {
    const li = document.createElement("li");
    li.setAttribute("id", todo.id);
    li.innerHTML =
        `
    <li>
        <span title="${todo.text}">${todo.text}</span>
        <button onclick="toggleComplete(${todo.id})"><i class="bi bi-check2"></i></button>
        <button onclick="editTodo(${todo.id})"><i class="bi bi-pencil-square"></i></button>
        <button onclick="removeTodo(${todo.id})"><i class="bi bi-trash"></i></button>
    </li>
    `;

    li.classList.toggle("completed", todo.completed)
    todoList.appendChild(li);
}