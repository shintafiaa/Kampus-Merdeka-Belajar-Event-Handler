//menampilkan artikel buku
document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBookList();
  });

  const searchButton = document.getElementById("searchSubmit");
  searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    const keyword = document.getElementById("searchBookTitle").value;
    searchBook(keyword.toLowerCase());
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});
