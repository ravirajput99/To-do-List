var btn = document.querySelector("button");
var list = document.querySelector(".todos");
var search = document.querySelector(".search");
var addinput = document.getElementById("input");
let todos, tick;
if (tick != null) {
  document.querySelector(".tick");
}
if (JSON.parse(localStorage.getItem("todolist")) != null) {
  todos = JSON.parse(localStorage.getItem("todolist"));
} else {
  todos = [];
}
//generate html template
const template = (todo) => {
  const listItem =
    '<li class="list-group-item d-flex justify-content-between align-items-center"><i class="far fa-square fa-2x tick" onclick="checkclick(event)"></i><span>' +
    todo +
    '</span><i class="far fa-trash-alt fa-lg delete"></i></li>';
  console.log(list.innerHTML);
  list.innerHTML += listItem;
};
btn.addEventListener("click", (event) => {
  const todo = addinput.value;
  event.preventDefault();
  search.value = ""; //clearing search field
  if (todo.length) {
    template(todo);
    let obj = { task: todo, completed: "false" };
    todos.push(obj);
    storetodo(todos); //local storage call
    tick = document.querySelector(".tick");
    emptyfield();
  } else {
    emptyfield();
  }
  document.getElementById("input").value = "";
});
//if field is empty
function emptyfield() {
  let empty = document.getElementById("empty");
  if (addinput.value === "") {
    empty.innerHTML = "Please enter task";
    empty.style.color = "red";
    setTimeout(function () {
      empty.innerHTML = "";
    }, 2000);
  } else {
    empty.innerHTML = "Task added successfully";
    empty.style.color = "#079e19";
    setTimeout(function () {
      empty.innerHTML = "";
    }, 2000);
  }
}

// --------------searching-------------------------------------------------------
const filterTodos = (term) => {
  Array.from(list.children)
    .filter((elements) => {
      return !elements.textContent.toLowerCase().includes(term);
    })
    .forEach((elements) => elements.classList.add("filtered"));

  Array.from(list.children)
    .filter((elements) => {
      return elements.textContent.toLowerCase().includes(term);
    })
    .forEach((elements) => elements.classList.remove("filtered"));
};

search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});
// -----------------------------------------------------------local storage-------------------------------------------------------------
function storetodo(todos) {
  localStorage.setItem("todolist", JSON.stringify(todos));
}
window.onload = function () {
  if (JSON.parse(localStorage.getItem("todolist")) != null) {
    todos = JSON.parse(localStorage.getItem("todolist"));
    display();
  }
};
function display() {
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].completed == "false") {
      const listItem =
        '<li class="list-group-item d-flex justify-content-between align-items-center"><i class="far fa-square fa-2x tick" onclick="checkclick(event)"></i><span>' +
        todos[i].task +
        '</span><i class="far fa-trash-alt fa-lg delete"></i></li>';
      list.innerHTML += listItem;
    } else {
      const listItem =
        '<li class="list-group-item d-flex justify-content-between align-items-center"><i class="far fa-check-square fa-2x tick" onclick="checkclick(event)"></i><span class="strike">' +
        todos[i].task +
        '</span><i class="far fa-trash-alt fa-lg delete"></i></li>';
      list.innerHTML += listItem;
    }
    Cdisplay();
    doneDisplay();
  }
}
//delete
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    event.target.parentElement.remove();
    deleteElement(event);
  }
});
function deleteElement(event) {
  var items = JSON.parse(localStorage.getItem("todolist"));
  if (items.length == 0) {
    return;
  }
  for (var i = 0; i < items.length; i++) {
    if (items[i].task == event.target.parentElement.textContent) {
      items.splice(i, 1);
    }
  }
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].task == event.target.parentElement.textContent) {
      todos.splice(i, 1);
    }
  }
  localStorage.setItem("todolist", JSON.stringify(items));
}
// -----------------------------------checkbox---------------------------------------

function checkclick(event) {
  if (event.target.classList.contains("fa-square")) {
    event.target.classList.remove("fa-square");
    event.target.classList.add("fa-check-square");
    event.target.nextElementSibling.classList.add("strike");
    setTimeout(function () {
      event.target.parentElement.classList.add("display");
    }, 1000);
    console.log(event.target.parentElement.textContent);
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].task == event.target.parentElement.textContent) {
        todos[i].completed = "true";
      }
    }
    localStorage.setItem("todolist", JSON.stringify(todos));
  } else {
    event.target.nextElementSibling.classList.remove("strike");
    event.target.classList.remove("fa-check-square");
    event.target.classList.add("fa-square");
    setTimeout(function () {
      event.target.parentElement.classList.add("display");
    }, 1000);
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].task == event.target.parentElement.textContent) {
        todos[i].completed = "false";
      }
    }
  }
  localStorage.setItem("todolist", JSON.stringify(todos));
  // console.log(todos);
}
// ----------------------------------tobecomplete----------------
let tobedone = document.querySelector(".tobedone");
let completed = document.querySelector(".completed");

completed.addEventListener("click", (event) => {
  event.target.classList.remove("completed");
  event.target.classList.add("tobedone");
  tobedone.classList.remove("tobedone");
  tobedone.classList.add("completed");
  Cdisplay();
});
tobedone.addEventListener("click", (event) => {
  event.target.classList.remove("completed");
  event.target.classList.add("tobedone");
  completed.classList.remove("tobedone");
  completed.classList.add("completed");
  // localStorage.clear();
  doneDisplay();
});

function Cdisplay() {
  var item = document.querySelectorAll("ul li");
  for (var i = 0; i < item.length; i++) {
    if (todos[i].task == item[i].textContent) {
      // console.log(todos[i].completed);
      if (todos[i].completed == "false") {
        // console.log(item[i]);
        item[i].classList.add("display");
      } else {
        item[i].classList.remove("display");
      }
    }
  }
  btn.disabled = true;
}
function doneDisplay() {
  var item = document.querySelectorAll("ul li");
  for (var i = 0; i < item.length; i++) {
    if (todos[i].task == item[i].textContent) {
      if (todos[i].completed == "false") {
        item[i].classList.remove("display");
      } else {
        item[i].classList.add("display");
      }
    }
  }
  btn.disabled = false;
}
