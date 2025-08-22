import express from 'express';
import { Book } from '../models/bookModel.js';
const router = express.Router();

//To save a new book
router.post('/', async (request,response) => {
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
router.get('/', async (request, response) => {
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
router.get('/:id', async (request, response) => {  
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

//route to update a book by ID
router.put('/:id', async (request, response) => {
  try {
    if (!request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
      return response.status(404).send({ message: 'Book not found' });
    }
    const { id } = request.params;
            // {new:true} returns the updated document
    const updatedbook = await Book.findByIdAndUpdate(id, request.body, { new: true });

    if (!updatedbook) {
      return response.status(404).send({ message: 'Book not found' });
    }
    return response.status(200).json({
      data: updatedbook, message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route to delete a book by ID
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const deletedbook = await Book.findByIdAndDelete(id);
    if (!deletedbook) {
      return response.status(404).send({ message: 'Book not found' });
    }
    return response.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;