const INCOMPLETED_BOOK_LIST = "incompleteBookshelfList";
const COMPLETED_BOOK_LIST = "completeBookshelfList";
const TODO_ITEMID = "itemid";

function addIncompleteBookList() {
  const incompletedBOOKList = document.getElementById(INCOMPLETED_BOOK_LIST);
  //const idBook = +new Date();
  const titleBook = document.getElementById("inputBookTitle").value;
  const authorBook = document.getElementById("inputBookAuthor").value;
  const yearBook = document.getElementById("inputBookYear").value;
  const statusBook = document.getElementById("inputBookIsComplete").checked;

  const perBook = makeBookListOnPage(titleBook, authorBook, yearBook);
  incompletedBOOKList.append(perBook);
}

//membuat item untuk mengisi container
function makeBookListOnPage(title, author, year, isCompleted) {
  const textBookTitle = document.createElement("h3");
  textBookTitle.innerText = title;

  const textBookAuthor = document.createElement("p");
  textBookAuthor.innerText = author;

  const textBookYear = document.createElement("p");
  textBookYear.innerText = year;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner"); //tambahkan class “inner” pada tag div
  textContainer.append(textBookTitle, textBookAuthor, textBookYear);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);

  if (isCompleted) {
    container.append(createUndoButton(), createTrashButton());
  } else {
    container.append(createCheckButton(), createTrashButton());
  }

  return container;
}

//fungsi membuat elemen button
function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function addBookToCompleted(bookElement) {
  const completedBOOKList = document.getElementById(COMPLETED_BOOK_LIST);
  const bookTitle = bookElement.querySelector(".inner > h3").innerText;
  const bookAuthor = bookElement.querySelector(".inner > p").innerText;
  const bookYear = bookElement.querySelector(".inner > p").innerText;

  const newBookArticle = makeBookListOnPage(
    bookTitle,
    bookAuthor,
    bookYear,
    true
  );
  completedBOOKList.append(newBookArticle);
  bookElement.remove();
}

function createCheckButton() {
  return createButton("check-button", function (event) {
    addBookToCompleted(event.target.parentElement);
  });
}

//fungsi menghapus elemen buku
function removeBook(bookElement) {
  bookElement.remove();
}

//fungsi membuat tombol hapus buku dengan class trash-button
function createTrashButton() {
  return createButton("trash-button", function (event) {
    removeBook(event.target.parentElement);
  });
}

function undoBookFromCompleted(bookElement) {
  const listUncompleted = document.getElementById(INCOMPLETED_BOOK_LIST);
  const bookTitle = bookElement.querySelector(".inner > h3").innerText;
  const bookAuthor = bookElement.querySelector(".inner > p").innerText;
  const bookYear = bookElement.querySelector(".inner > p").innerText;

  const newBookArticle = makeBookListOnPage(
    bookTitle,
    bookAuthor,
    bookYear,
    false
  );

  listUncompleted.append(newBookArticle);
  bookElement.remove();
}

function createUndoButton() {
  return createButton("undo-button", function (event) {
    undoBookFromCompleted(event.target.parentElement);
  });
}
