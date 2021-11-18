const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos";

function addTodo() {
  const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
  const textTodo = document.getElementById("title").value; //mengambil elemen pada html, mengambil element <input> dengan id title
  const timestamp = document.getElementById("date").value;

  const todo = makeTodo(textTodo, timestamp);
  uncompletedTODOList.append(todo);
}

function makeTodo(data, timestamp, isCompleted) {
  const textTitle = document.createElement("h2"); //membuat element html
  textTitle.innerText = data; // masukkan text “Tugas Android” pada elemen h2, asukkan elemen tadi ke dalam variable textTitle

  const textTimestamp = document.createElement("p");
  textTimestamp.innerText = timestamp;

  const textContainer = document.createElement("div"); // buat container pembungkus untuk membungkus textTitle dan textTimestamp dengan tag <div>
  textContainer.classList.add("inner"); //tambahkan class “inner” pada tag div
  textContainer.append(textTitle, textTimestamp); //memasukkan textTitle dan textTimestamp ke dalam textContainer

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);

  //Apabila isCompleted bernilai true, tombol hapus yang akan di-render. Sebaliknya jika isCompleted bernilai false, tombol checklist yang akan di-render.
  if (isCompleted) {
    container.append(createUndoButton(), createTrashButton());
  } else {
    container.append(createCheckButton());
  }

  return container;
}

//tombol untuk menandai todo sudah selesai dilakukan
function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function addTaskToCompleted(taskElement) {
  const taskTitle = taskElement.querySelector(".inner > h2").innerText;
  const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

  const newTodo = makeTodo(taskTitle, taskTimestamp, true);
  const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
  listCompleted.append(newTodo);
  taskElement.remove();
}

function createCheckButton() {
  return createButton("check-button", function (event) {
    addTaskToCompleted(event.target.parentElement);
  });
}

function removeTaskFromCompleted(taskElement) {
  taskElement.remove();
}

function createTrashButton() {
  return createButton("trash-button", function (event) {
    removeTaskFromCompleted(event.target.parentElement);
  });
}

function undoTaskFromCompleted(taskElement) {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
  const taskTitle = taskElement.querySelector(".inner > h2").innerText;
  const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

  const newTodo = makeTodo(taskTitle, taskTimestamp, false);
  listUncompleted.append(newTodo);
  taskElement.remove();
}

function createUndoButton() {
  return createButton("undo-button", function (event) {
    undoTaskFromCompleted(event.target.parentElement);
  });
}
