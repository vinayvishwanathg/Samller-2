const bookself = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'data_book';

  function isStorageExist() { 
    if (typeof (Storage) === undefined) {
      alert('Browser kamu tidak mendukung local storage');
      return false;
    }
    return true;
  }  

  // Memuat Storage
  function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
  
    if (data !== null) {
      for (const book of data) {
        bookself.push(book);
      }
    }
  
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  function generateDataBook(id, title, author, year,isComplete) {
      return {
        id,
        title,
        author,
        year,
        isComplete
      }
    }
  
  function generateId() {
    return +new Date();
  }
  
  function saveData() {
    if (isStorageExist()) {
      const parsed = JSON.stringify(bookself);
      localStorage.setItem(STORAGE_KEY, parsed);
      document.dispatchEvent(new Event(SAVED_EVENT));
    }
  }

  function addBook() {
    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = document.getElementById('inputBookYear').value;
    const isComplete = document.getElementById('inputBookIsComplete').checked;
   
    const generatedID = generateId();
    const bookObject = generateDataBook(generatedID, title, author, year,isComplete);
    
    // Kosongkan Kolom Input Setelah Klik Submit
    document.getElementById("inputBookTitle").value = "";
    document.getElementById("inputBookAuthor").value = "";
    document.getElementById("inputBookYear").value = "";
    document.getElementById("inputBookIsComplete").checked = false;
    bookself.push(bookObject);
    document.dispatchEvent(new Event(RENDER_EVENT));    
    saveData();
  }

  document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBook');
    const searchForm = document.getElementById('searchBook');

    submitForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addBook();            
    });
    if (isStorageExist()) {
      loadDataFromStorage();
    }
    
    searchForm.addEventListener('submit', function(event) {
      const searchInput = document.getElementById('searchBookTitle').value;
      const categorySelect = document.getElementById('kategori').value;

      event.preventDefault();
      searchBooks(searchInput, categorySelect);
    });

  });

  function findBook(bookId) {
    for (const bookItem of bookself) {
      if (bookItem.id === bookId) {
        return bookItem;
      }
    }
    return null;
  }

  function makeBook(bookObject) {
    const textTitle = document.createElement('h3');
    textTitle.innerText = ("Judul Buku : " + bookObject.title);
   
    const textAuthor = document.createElement('p');
    textAuthor.innerText = ("Penulis : " + bookObject.author);
    
    const textYear = document.createElement('p');
    textYear.innerText = ("Tahun : " + bookObject.year);
   
    const action = document.createElement('div');
    action.classList.add('action');
    
    const container = document.createElement('article');
    container.classList.add('book_item');
    container.append(textTitle, textAuthor,textYear);
    container.append(action);
    container.setAttribute('id', `book-${bookObject.id}`);
   
    if (bookObject.isComplete) {
      const inCompleteButton = document.createElement('button');
      inCompleteButton.classList.add('green');
      inCompleteButton.textContent = 'Belum Dibaca';
   
      inCompleteButton.addEventListener('click', function () {
        undoBookFromCompleted(bookObject.id);
      });
   
      const trashButton = document.createElement('button');
      trashButton.classList.add('red');
      trashButton.textContent = 'Hapus Buku';
   
      trashButton.addEventListener('click', function () {
        removeBookFromCompleted(bookObject.id);
      });
   
      action.append(inCompleteButton, trashButton);
    } else {
      const completeButton = document.createElement('button');
      completeButton.classList.add('green');
      completeButton.textContent = 'Selesai Dibaca';

   
      completeButton.addEventListener('click', function () {
        addBookToCompleted(bookObject.id);
      });
   
      const trashButton = document.createElement('button');
      trashButton.classList.add('red');
      trashButton.textContent = 'Hapus Buku';
   
      trashButton.addEventListener('click', function () {
        removeBookFromCompleted(bookObject.id);
      });
   
      action.append(completeButton, trashButton);
    }

    return container;
  }

  function findBookIndex(bookId) {
    for (const index in bookself) {
      if (bookself[index].id === bookId) {
        return index;
      }
    }
   
    return -1;
  }

  function addBookToCompleted (bookId) {
    const bookTarget = findBook(bookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

  function removeBookFromCompleted(bookId) {
    const bookTarget = findBookIndex(bookId);
    const confirmDelete = confirm(`Anda yakin ingin menghapus buku yang berjudul '${bookself[bookTarget].title}'?`);

    if (confirmDelete) {

      if (bookTarget === -1) return;
     
      bookself.splice(bookTarget, 1);
      document.dispatchEvent(new Event(RENDER_EVENT));
      saveData();
    }
  }
   
  function undoBookFromCompleted(bookId) {
    const bookTarget = findBook(bookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

  // Menampilkan Pencarian Buku
  function displaySearchResults(searchResults) {
    const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
    const completeBookshelfList = document.getElementById('completeBookshelfList');
    incompleteBookshelfList.innerHTML = '';
    completeBookshelfList.innerHTML = '';
    
    for (const bookItem of searchResults) {
        const bookElement = makeBook(bookItem);
        
        if (bookItem.isComplete) {
            completeBookshelfList.append(bookElement);
        } else {
            incompleteBookshelfList.append(bookElement);
        }
    }
  }

  // Pencarian Buku Berdasarkan Kategori
  function searchBooks(searchTerm, category) {
    let bookData = localStorage.getItem(STORAGE_KEY);
    
    if (bookData) {
        bookData = JSON.parse(bookData);
    } else {
        bookData = [];
    }

    const searchResults = [];
    for (const bookItem of bookData) {
        if ((searchTerm === '' || bookItem.title.includes(searchTerm)) && (category === 'default' || category === 'belum' && !bookItem.isComplete || category === 'selesai' && bookItem.isComplete)) {
            searchResults.push(bookItem);
        }
    }
    console.log(searchResults);
    displaySearchResults(searchResults);
  }

  document.addEventListener(RENDER_EVENT, function () {
    const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
    incompleteBookshelfList.innerHTML = '';
   
    const completeBookshelfList = document.getElementById('completeBookshelfList');
    completeBookshelfList.innerHTML = '';
   
    for (const bookItem of bookself) {
      const bookElement = makeBook(bookItem);
      if (!bookItem.isComplete)
        incompleteBookshelfList.append(bookElement);
      else
        completeBookshelfList.append(bookElement);
    }
  });