# Book Store Management System

A full-stack MERN (MongoDB, Express, React, Node.js) web application for managing a book store. This application allows users to create, read, update, and delete books in an interactive and user-friendly interface.

## Features

- **Create Books**: Add new books to the store with title, author, and publish year
- **View All Books**: Display all books in a sorted list (newest first)
- **View Book Details**: See detailed information for individual books
- **Update Books**: Edit existing book information
- **Delete Books**: Remove books from the store
- **Responsive Design**: Mobile-friendly UI using Tailwind CSS
- **Real-time Notifications**: User feedback with toast notifications
- **Error Handling**: Comprehensive error handling on both frontend and backend

## Project Structure

```
Book-Store-Management/
├── Backend/
│   ├── config.js              # Environment configuration
│   ├── index.js               # Express server setup
│   ├── package.json           # Backend dependencies
│   ├── models/
│   │   └── bookModel.js       # Mongoose Book schema
│   └── routes/
│       └── booksRoute.js      # API route handlers
│
└── Frontend/
    ├── src/
    │   ├── main.jsx           # React entry point
    │   ├── App.jsx            # Main app component with routing
    │   ├── index.css          # Global styles
    │   ├── pages/
    │   │   ├── Home.jsx       # Display all books
    │   │   ├── CreateBooks.jsx # Create new book
    │   │   ├── EditBook.jsx   # Edit book details
    │   │   ├── DeleteBook.jsx # Delete book confirmation
    │   │   └── ShowBook.jsx   # View book details
    │   ├── components/
    │   │   ├── BackButton.jsx # Navigation back button
    │   │   ├── Spinner.jsx    # Loading spinner
    │   │   └── home/
    │   │       ├── BooksCard.jsx      # Card view for books
    │   │       ├── BookSingleCard.jsx # Individual book card
    │   │       └── BooksTable.jsx     # Table view for books
    │   └── assets/            # Static assets
    ├── package.json           # Frontend dependencies
    ├── vite.config.js         # Vite configuration
    ├── tailwind.config.js     # Tailwind CSS configuration
    ├── eslint.config.js       # ESLint configuration
    └── postcss.config.js      # PostCSS configuration
```

## Tech Stack

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **Mongoose**: MongoDB object modeling
- **Nodemon**: Development server auto-reload
- **CORS**: Cross-origin resource sharing
- **Dotenv**: Environment variable management

### Frontend
- **React 19**: UI library
- **React Router DOM**: Client-side routing
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client
- **Notistack**: Toast notification library
- **React Icons**: Icon library

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Book-Store-Management
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

### 3. Frontend Setup
```bash
cd ../Frontend
npm install
```

## Configuration

### Backend Configuration

Create a `.env` file in the `Backend` directory:

```env
PORT=5000
MONGO_DB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

- Replace `<username>` with your MongoDB username
- Replace `<password>` with your MongoDB password
- Replace `<cluster>` with your cluster name
- Replace `<database>` with your database name

### Frontend Configuration

The frontend is pre-configured to connect to the backend at `http://localhost:5000`. Ensure the backend server is running before starting the frontend.

## API Endpoints

All API endpoints are prefixed with `/books`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get a specific book by ID |
| POST | `/books` | Create a new book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |


### Request/Response Examples

#### GET /books
**Response:**
```json
{
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "publishYear": 1925,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### POST /books
**Request:**
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publishYear": 1925
}
```

**Response:** (201 Created)
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publishYear": 1925,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### PUT /books/:id
**Request:**
```json
{
  "title": "The Great Gatsby (Updated)",
  "author": "F. Scott Fitzgerald",
  "publishYear": 1925
}
```

**Response:** (200 OK)
```json
{
  "data": { /* updated book object */ },
  "message": "Book updated successfully"
}
```

#### DELETE /books/:id
**Response:** (200 OK)
```json
{
  "message": "Book deleted successfully",
  "data": { /* deleted book object */ }
}
```