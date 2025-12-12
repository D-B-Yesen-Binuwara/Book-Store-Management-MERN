import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

router.post('/', async (request, response) => {
  try {
    const { title, author, publishYear } = request.body;
    
    if (!title || !author || !publishYear) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const newBook = { title, author, publishYear };
    const book = await Book.create(newBook);
    
    return response.status(201).send(book);
  } catch (error) {
    console.error('Error creating book:', error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get('/', async (request, response) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 }); // Sort by newest first
    
    return response.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    console.error('Error fetching books:', error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    
    if (!book) {
      return response.status(404).send({ message: 'Book not found' });
    }
    
    return response.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book:', error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put('/:id', async (request, response) => {
  try {
    const { title, author, publishYear } = request.body;
    const { id } = request.params;
    
    if (!title || !author || !publishYear) {
      return response.status(400).send({ 
        message: 'Send all required fields: title, author, publishYear' 
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id, 
      { title, author, publishYear }, 
      { new: true }
    );

    if (!updatedBook) {
      return response.status(404).send({ message: 'Book not found' });
    }
    
    return response.status(200).json({
      data: updatedBook, 
      message: 'Book updated successfully' 
    });
  } catch (error) {
    console.error('Error updating book:', error.message);
    response.status(500).send({ message: error.message });
  }
});

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    
    if (!deletedBook) {
      return response.status(404).send({ message: 'Book not found' });
    }
    
    return response.status(200).json({ 
      message: 'Book deleted successfully',
      data: deletedBook 
    });
  } catch (error) {
    console.error('Error deleting book:', error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;