// Function to handle form submission for adding a new book
document.getElementById('inputBook').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission
  
  // Get the values entered by the user
  const title = document.getElementById('inputBookTitle').value;
  const author = document.getElementById('inputBookAuthor').value;
  const year = document.getElementById('inputBookYear').value;
  const isComplete = document.getElementById('inputBookIsComplete').checked;
  
  // Create a new book object
  const newBook = {
    title: title,
    author: author,
    year: year,
    isComplete: isComplete
  };

  // Add the new book to the appropriate shelf
  if (isComplete) {
    addToCompleteBookshelf(newBook);
  } else {
    addToIncompleteBookshelf(newBook);
  }
  
  // Clear the form fields
  document.getElementById('inputBookTitle').value = '';
  document.getElementById('inputBookAuthor').value = '';
  document.getElementById('inputBookYear').value = '';
  document.getElementById('inputBookIsComplete').checked = false;
});

// Function to add a new book to the complete bookshelf
function addToCompleteBookshelf(book) {
  const shelf = document.getElementById('completeBookshelfList');
  const bookElement = createBookElement(book);
  shelf.appendChild(bookElement);
}

// Function to add a new book to the incomplete bookshelf
function addToIncompleteBookshelf(book) {
  const shelf = document.getElementById('incompleteBookshelfList');
  const bookElement = createBookElement(book);
  shelf.appendChild(bookElement);
}

// Function to create a book element
function createBookElement(book) {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book');
  
  const titleHeading = document.createElement('h3');
  titleHeading.textContent = book.title;
  
  const authorPara = document.createElement('p');
  authorPara.textContent = 'by ' + book.author;
  
  const yearPara = document.createElement('p');
  yearPara.textContent = 'Published: ' + book.year;
  
  if (book.isComplete) {
    const markAsReadButton = document.createElement('button');
    markAsReadButton.textContent = 'Mark as Read';
    markAsReadButton.classList.add('markAsReadButton');
    markAsReadButton.addEventListener('click', function() {
      // Move the book to the complete bookshelf when marked as read
      const shelf = document.getElementById('completeBookshelfList');
      shelf.appendChild(bookDiv);
    });
    bookDiv.appendChild(markAsReadButton);
  }
  
  bookDiv.appendChild(titleHeading);
  bookDiv.appendChild(authorPara);
  bookDiv.appendChild(yearPara);
  
  return bookDiv;
}
