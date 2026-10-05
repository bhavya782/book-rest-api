# Book REST API

A clean, beginner-friendly RESTful API built with **Node.js** and **Express.js** to manage a collection of books using in-memory JavaScript array storage.

---

## 📌 Description

This project is created as part of the Web Development Internship (**Task 3**). It demonstrates how to construct a lightweight REST API from scratch using Node.js and Express.js. The API supports full CRUD (Create, Read, Update, Delete) capabilities on book records stored in memory without requiring an external database.

---

## 🎯 Features

* 📖 **Read All Books**: Retrieve a full list of books.
* 🔍 **Read Single Book**: Fetch details of a specific book by numeric ID.
* ➕ **Create Book**: Add a new book with auto-incremented numeric ID.
* ✏️ **Update Book**: Modify existing book details by ID.
* 🗑️ **Delete Book**: Remove a book entry by ID.
* 🛡️ **Request Validation**: Validates required payload fields (`title` and `author`).
* ⚠️ **Error Handling**: Gracefully handles invalid IDs, non-existent routes (404), missing data (400), and malformed JSON payloads.

---

## 🛠️ Technologies Used

* **Node.js**: JavaScript runtime environment
* **Express.js**: Web framework for Node.js
* **JavaScript (ES6+)**: Core programming language
* **JSON**: Data format for HTTP request/response payloads
* **Postman**: API testing and verification tool

---

## 📂 Project Structure

```text
book-rest-api/
│
├── package.json        # Project metadata and dependencies
├── package-lock.json   # Lockfile for exact dependency versions
├── server.js           # Main Express server and route handlers
├── README.md           # Documentation and API guide
├── .gitignore          # Git ignore configuration
│
└── screenshots/        # Postman test screenshot artifacts
    └── .gitkeep
```

---

## 🚀 Installation

1. **Clone or download the repository:**
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd book-rest-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## 💻 Run the Server

Start the Express server:

```bash
npm start
```

The server will start and run on:

```text
http://localhost:3000
```

---

## 📋 API Endpoints Summary

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Check API status & view available routes | `200 OK` |
| **GET** | `/books` | Retrieve all books | `200 OK` |
| **GET** | `/books/:id` | Retrieve a specific book by ID | `200 OK` / `404 Not Found` |
| **POST** | `/books` | Create a new book | `201 Created` / `400 Bad Request` |
| **PUT** | `/books/:id` | Update an existing book by ID | `200 OK` / `400 Bad Request` / `404 Not Found` |
| **DELETE** | `/books/:id` | Delete a book by ID | `200 OK` / `404 Not Found` |

---

## 📝 Example Requests & Payloads

### 1. Create a Book (`POST /books`)
* **Headers**: `Content-Type: application/json`
* **Request Body**:
```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin"
}
```
* **Response (`201 Created`)**:
```json
{
  "id": 3,
  "title": "Clean Code",
  "author": "Robert C. Martin"
}
```

---

### 2. Update a Book (`PUT /books/1`)
* **Headers**: `Content-Type: application/json`
* **Request Body**:
```json
{
  "title": "The Alchemist - 25th Anniversary Edition",
  "author": "Paulo Coelho"
}
```
* **Response (`200 OK`)**:
```json
{
  "id": 1,
  "title": "The Alchemist - 25th Anniversary Edition",
  "author": "Paulo Coelho"
}
```

---

### 3. Delete a Book (`DELETE /books/1`)
* **Response (`200 OK`)**:
```json
{
  "message": "Book deleted successfully"
}
```

---

## 🧪 Postman Step-by-Step Testing Guide

Follow these steps in Postman to test every API endpoint:

1. **Check Server Status**:
   * Method: `GET`
   * URL: `http://localhost:3000/`
2. **Get All Initial Books**:
   * Method: `GET`
   * URL: `http://localhost:3000/books`
3. **Get Book by ID**:
   * Method: `GET`
   * URL: `http://localhost:3000/books/1`
4. **Add a New Book**:
   * Method: `POST`
   * URL: `http://localhost:3000/books`
   * Navigate to `Body` tab ➔ Select `raw` ➔ Select `JSON`
   * Enter payload:
     ```json
     {
       "title": "Clean Code",
       "author": "Robert C. Martin"
     }
     ```
5. **Verify New Book Added**:
   * Method: `GET`
   * URL: `http://localhost:3000/books`
6. **Update Book details**:
   * Method: `PUT`
   * URL: `http://localhost:3000/books/1`
   * `Body` ➔ `raw` ➔ `JSON`:
     ```json
     {
       "title": "The Alchemist - Updated Edition",
       "author": "Paulo Coelho"
     }
     ```
7. **Verify Book Updated**:
   * Method: `GET`
   * URL: `http://localhost:3000/books/1`
8. **Delete Book**:
   * Method: `DELETE`
   * URL: `http://localhost:3000/books/1`
9. **Verify Deletion (Expect 404)**:
   * Method: `GET`
   * URL: `http://localhost:3000/books/1`
10. **Test Non-Existent Book ID (Expect 404)**:
    * Method: `GET`
    * URL: `http://localhost:3000/books/999`
11. **Test Validation Failure (Expect 400)**:
    * Method: `POST`
    * URL: `http://localhost:3000/books`
    * `Body` ➔ `raw` ➔ `JSON`:
      ```json
      {
        "title": "Book Without Author"
      }
      ```
12. **Test Unknown Route (Expect 404)**:
    * Method: `GET`
    * URL: `http://localhost:3000/invalid-endpoint`

---

## 🎓 Learning Outcomes

Through this task, key backend concepts demonstrated include:
* Building lightweight HTTP web servers with Express.js.
* Proper application of RESTful API architectural constraints and HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`).
* Implementation of custom middleware and standard `express.json()` body parsing.
* Dynamic route parameters handling (`req.params.id`).
* Precise HTTP status code handling (`200`, `201`, `400`, `404`).
* Robust request validation and error boundary management.
* Comprehensive API testing using Postman.

---

## 📤 GitHub Upload Commands

To upload this completed project to your GitHub repository (`book-rest-api`):

```bash
git init
git add .
git commit -m "Create Book REST API with Express"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```
