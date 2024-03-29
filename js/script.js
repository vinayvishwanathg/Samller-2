<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Bookshelf App</title>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap" rel="stylesheet"> 
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"> <!-- Font Awesome -->
  <link rel="stylesheet" href="css/style.css"> <!-- Your custom stylesheet -->
  <style>
    /* Additional custom styles */
    .search_section {
      text-align: center;
    }

    .search_bar {
      margin-bottom: 20px;
    }

    .search_bar input[type="text"] {
      padding: 10px;
      width: 300px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    .search_bar button {
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .search_bar button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <header class="head_bar">
    <h1 class="head_bar__title">Bookshelf Application</h1>
  </header>
  <main>
    <section class="input_section">
      <h2>Add a New Book</h2>
      <form id="inputBook" class="form" action="index.html">
        <div class="input">
          <input type="text" id="inputBookTitle" placeholder="Book Title" required>
          <input type="text" id="inputBookAuthor" placeholder="Author" required>
          <input type="number" id="inputBookYear" placeholder="Year Published" required>
        </div>
        <div class="input_inline">
          <label for="inputBookIsComplete">Completed</label>
          <input id="inputBookIsComplete" type="checkbox">
        </div>
        <button id="bookSubmit" value="Submit" name="Submit" type="submit">Add Book</button>
      </form>
    </section>
    
    <section class="search_section">
      <h2>Search for Books on Amazon</h2>
      <div class="search_bar">
        <form action="https://www.amazon.com/s" method="get" target="_blank">
          <input type="text" name="k" placeholder="Enter Book Title">
          <button type="submit"><i class="fas fa-search"></i> Search</button>
        </form>
      </div>
    </section>
    
    <section class="book_shelf">
      <div class="shelf">
        <h2>Unread Books</h2>
        <div id="incompleteBookshelfList" class="book_list">
          <!-- Add unread books here -->
        </div>
      </div>
      <div class="shelf">
        <h2>Read Books</h2>
        <div id="completeBookshelfList" class="book_list">
          <!-- Add read books here -->
        </div>
      </div>
    </section>
  </main>
  <script src="js/script.js"></script>
</body>
</html>
