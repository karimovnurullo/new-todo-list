const itemIcons = document.querySelectorAll('.menu i');
const itemMenu = document.querySelectorAll('.menu');
const controlMenu = document.querySelectorAll('.control');
const input = document.querySelector('.input');
const inputEdit = document.querySelector('.input-edit');
const mainDiv = document.querySelector('.main');
const form = document.querySelector('.form');
const formEdit = document.querySelector('.form-edit');
const clearBtn = document.querySelector('.clear-btn');

let editItemID;
let oldValue;

let todos = JSON.parse(localStorage.getItem("list")) ? JSON.parse(localStorage.getItem("list")) : [];

if (todos.length) showTodos();

function getTime() {
    const now = new Date()
    const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    const month =
      now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : now.getMonth()
    const year = now.getFullYear()
  
    const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    const minute =
      now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    const second =
      now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
  
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    return `${hour}:${minute}, ${date}.${month}.${year}`
  }

function setTodos() {
    localStorage.setItem("list", JSON.stringify(todos));
}

function showTodos() {
    const todos = JSON.parse(localStorage.getItem("list"));
    mainDiv.innerHTML = "";
    todos.forEach((item, i) => {
        console.log(item);
        mainDiv.innerHTML += `
        <div class="item ${item.completed == true ? "completed" : ""}">
            <div class="content">${item.text}</div>
            <div class="control">
               <div class="menu">
                <span class="time">${item.time}</span>
                  <i onclick=(completedTodo(${i})) class="uil uil-check"></i>
                  <i onclick=(editTodo(${i})) class="uil uil-pen"></i>
                  <i onclick=(deleteTodo(${i})) class="uil uil-trash"></i>
               </div>
               <i class="uil uil-ellipsis-v"></i>
            </div>
         </div>
        `;
    });
}

function deleteTodo(id) {
    const deleteTodos = todos.filter((item, i) => i !== id);
    todos = deleteTodos;
    setTodos();
    showTodos();
}

function completedTodo(id) {
    const comlatedTodos = todos.map((item, i) => {
        if (id == i) {
            return {
                ...item,
                completed: item.completed == true ? false : true
            };
        } else return {
            ...item
        };
    })
    todos = comlatedTodos;
    setTodos();
    showTodos();
}

function editTodo(id) {
    open();
    editItemID = id;
    inputEdit.focus();
    inputEdit.value = todos[editItemID].text;
}
formEdit.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputValue = inputEdit.value.trim();
    if (inputValue.length) {
        todos.splice(editItemID, 1, {
            text: inputValue,
            time: getTime(),
            completed: false
        });
        setTodos();
        showTodos();
        close();
        input.focus();
    } else {
        inputEdit.value = "";
        inputEdit.setAttribute('placeholder', 'Please , edit some text...');
        setTimeout(() => {
            inputEdit.setAttribute('placeholder', '');
        }, 2000);
    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputValue = input.value.trim();
    if (inputValue.length) {
        console.log(inputValue);
        todos.push({
            text: inputValue,
            time: getTime(),
            completed: false
        });
        input.value = "";
        setTodos();
        showTodos();
    } else {
        input.value = "";
        input.setAttribute('placeholder', 'Please , enter some text...');
        setTimeout(() => {
            input.setAttribute('placeholder', '');
        }, 2000);
    }
})

function open() {
    formEdit.classList.remove('hidden');
    form.classList.add('hidden');
}

function close() {
    formEdit.classList.add('hidden');
    form.classList.remove('hidden');
}
clearBtn.addEventListener('click', () => {
    console.log("Cleared");
    todos = [];
    setTodos();
    showTodos();
});
