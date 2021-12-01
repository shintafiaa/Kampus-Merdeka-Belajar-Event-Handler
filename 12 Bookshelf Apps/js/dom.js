const INCOMPLETED_BOOK_LIST = "incompleteBookshelfList";
const COMPLETED_BOOK_LIST = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function addBookList() {
  const incompletedBOOKList = document.getElementById(INCOMPLETED_BOOK_LIST);
  const completedBOOKList = document.getElementById(COMPLETED_BOOK_LIST);
  //const idBook = +new Date();
  const titleBook = document.getElementById("inputBookTitle").value;
  const authorBook = document.getElementById("inputBookAuthor").value;
  const yearBook = document.getElementById("inputBookYear").value;

  let check = false;
  if (document.getElementById("inputBookIsComplete").checked) {
    check = true;
  }
  if (check) {
    document.querySelector("span").innerText = "Selesai dibaca";
  }

  const book = makeBookListOnPage(titleBook, authorBook, yearBook, check);
  const bookObject = composeBookObject(titleBook, authorBook, yearBook, check);

  book[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  if (check) {
    completedBOOKList.append(book);
  } else {
    incompletedBOOKList.append(book);
  }

  updateDataToStorage();
}

//membuat item untuk mengisi container
function makeBookListOnPage(title, author, year, isCompleted) {
  const textBookTitle = document.createElement("h3");
  textBookTitle.innerText = title;

  const textBookAuthor = document.createElement("p");
  textBookAuthor.innerHTML = `Penulis: <span id="author">` + author + `</span>`;

  const textBookYear = document.createElement("p");
  textBookYear.innerHTML = `Tahun: <span id="year">` + year + `</span>`;

  const textContainer = document.createElement("article");
  textContainer.classList.add("book_item"); //tambahkan class “inner” pada tag div
  textContainer.append(textBookTitle, textBookAuthor, textBookYear);

  const container = document.createElement("article");
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

function addBookToIncompleted(bookElement) {
  const incompletedBOOKList = document.getElementById(INCOMPLETED_BOOK_LIST);
  const bookTitle = bookElement.querySelector(".book_item > h3").innerText;
  const bookAuthor = bookElement.querySelector("span#author").innerText;
  const bookYear = bookElement.querySelector("span#year").innerText;

  const newBookArticle = makeBookListOnPage(
    bookTitle,
    bookAuthor,
    bookYear,
    false
  );
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = false;
  newBookArticle[BOOK_ITEMID] = book.id;

  incompletedBOOKList.append(newBookArticle);
  bookElement.remove();

  updateDataToStorage();
}

function addBookToCompleted(bookElement) {
  const completedBOOKList = document.getElementById(COMPLETED_BOOK_LIST);
  const bookTitle = bookElement.querySelector(".book_item > h3").innerText;
  const bookAuthor = bookElement.querySelector("span#author").innerText;
  const bookYear = bookElement.querySelector("span#year").innerText;

  const newBookArticle = makeBookListOnPage(
    bookTitle,
    bookAuthor,
    bookYear,
    true
  );
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = true;
  newBookArticle[BOOK_ITEMID] = book.id;

  completedBOOKList.append(newBookArticle);
  bookElement.remove();

  updateDataToStorage();
}

function createCheckButton() {
  return createButton("check-button", function (event) {
    addBookToCompleted(event.target.parentElement);
  });
}

//fungsi menghapus elemen buku
function removeBook(bookElement) {
  const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);

  bookElement.remove();
  updateDataToStorage();
}

//fungsi membuat tombol hapus buku dengan class trash-button
function createTrashButton() {
  return createButton("trash-button", function (event) {
    removeBook(event.target.parentElement);
  });
}

function undoBookFromCompleted(bookElement) {
  const listUncompleted = document.getElementById(INCOMPLETED_BOOK_LIST);
  const bookTitle = bookElement.querySelector(".book_item > h3").innerText;
  const bookAuthor = bookElement.querySelector("span#author").innerText;
  const bookYear = bookElement.querySelector("span#year").innerText;

  const newBookArticle = makeBookListOnPage(
    bookTitle,
    bookAuthor,
    bookYear,
    false
  );

  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = false;
  newBookArticle[BOOK_ITEMID] = book.id;

  listUncompleted.append(newBookArticle);
  bookElement.remove();

  updateDataToStorage();
}

function createUndoButton() {
  return createButton("undo-button", function (event) {
    undoBookFromCompleted(event.target.parentElement);
  });
}

function searchBook(keyword) {
  const bookList = document.querySelectorAll(".book_item");
  for (let book of bookList) {
    const titleBook = book.childNodes[0];
    if (!titleBook.innerText.toLowerCase().includes(keyword)) {
      childElement = titleBook.parentElement;
      childElement.parentElement.style.display = "none";
    } else {
      childElement = titleBook.parentElement;
      childElement.parentElement.style.display = "";
    }
  }
}
