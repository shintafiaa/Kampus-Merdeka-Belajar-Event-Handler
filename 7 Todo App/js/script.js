document.addEventListener("DOMContentLoaded", function () {
  //berfungsi sebagai listener yang akan menjalankan kode di dalamnya jika DOM sudah di-load dengan baik
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault(); //berfungsi untuk mencegah behaviour asli agar tidak dijalankan. Karena secara default jika tombol submit diklik, browser akan mengirimkan data ke url yang tertera pada properti action dan browser akan di-refresh
    addTodo();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});
document.addEventListener("ondataloaded", () => {
  refreshDataFromTodos();
});
