import express from 'express';
import { port, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import {Book} from './models/bookModel.js';
const app = express();

//middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
  console.log(req)
  return res.status(234).send('Hello World');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//To save a new book
app.post('/books', async (request,response) => {
  try{
    if(
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status (400).send({
        message:'Send all required fields: title, author, publishYear',
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  }catch (error) {
    console.log(error.message);
    response.status(500).send({message:error.message});
  }
});

//to GET all books
app.get('/books', async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET a book by ID
app.get('/books/:id', async (request, response) => {  
  try {
    const {id} = request.params;
    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).send({ message: 'Book not found' });
    }
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

mongoose.connect(mongoDBURL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
