const express = require('express');

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// In-memory data store for books
let books = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho"
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear"
  }
];

// Helper variable to auto-increment unique IDs for new books
let nextId = 3;

/**
 * Root Route: GET /
 * Description: Returns API status and helpful message explaining endpoints.
 */
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to the Book REST API! The server is running smoothly.",
    endpoints: {
      "GET /": "Check API status",
      "GET /books": "Get all books",
      "GET /books/:id": "Get a single book by ID",
      "POST /books": "Add a new book",
      "PUT /books/:id": "Update a book by ID",
      "DELETE /books/:id": "Delete a book by ID"
    }
  });
});

/**
 * 1. GET /books
 * Description: Retrieve all books from the in-memory store.
 * Response: 200 OK with list of books.
 */
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

/**
 * 2. GET /books/:id
 * Description: Retrieve a single book matching the requested numeric ID.
 * Response: 200 OK with book object, or 404 Not Found if missing.
 */
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);

  if (isNaN(bookId)) {
    return res.status(400).json({ message: "Invalid book ID format" });
  }

  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json(book);
});

/**
 * 3. POST /books
 * Description: Add a new book to the in-memory array.
 * Request Body: { title, author }
 * Response: 201 Created with newly created book object.
 */
app.post('/books', (req, res) => {
  const { title, author } = req.body || {};

  // Validate that both title and author are provided
  if (!title || !author || typeof title !== 'string' || typeof author !== 'string' || title.trim() === '' || author.trim() === '') {
    return res.status(400).json({ message: "Title and author are required" });
  }

  // Create new book object with auto-generated ID
  const newBook = {
    id: nextId++,
    title: title.trim(),
    author: author.trim()
  };

  books.push(newBook);

  res.status(201).json(newBook);
});

/**
 * 4. PUT /books/:id
 * Description: Update an existing book's details by ID.
 * Request Body: { title, author }
 * Response: 200 OK with updated book object, or 404 Not Found if missing.
 */
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);

  if (isNaN(bookId)) {
    return res.status(400).json({ message: "Invalid book ID format" });
  }

  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const { title, author } = req.body || {};

  // Validate request body
  if (!title || !author || typeof title !== 'string' || typeof author !== 'string' || title.trim() === '' || author.trim() === '') {
    return res.status(400).json({ message: "Title and author are required" });
  }

  // Update book entry
  books[bookIndex] = {
    id: bookId,
    title: title.trim(),
    author: author.trim()
  };

  res.status(200).json(books[bookIndex]);
});

/**
 * 5. DELETE /books/:id
 * Description: Remove a book from the array using its ID.
 * Response: 200 OK with success message, or 404 Not Found if missing.
 */
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);

  if (isNaN(bookId)) {
    return res.status(400).json({ message: "Invalid book ID format" });
  }

  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Delete book from array
  books.splice(bookIndex, 1);

  res.status(200).json({ message: "Book deleted successfully" });
});

/**
 * Error Handling Middleware for Malformed JSON payload
 */
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: "Invalid JSON request body" });
  }
  next(err);
});

/**
 * Middleware for 404 Not Found (Unknown routes)
 */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Export app for testing purposes and start server if executed directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
