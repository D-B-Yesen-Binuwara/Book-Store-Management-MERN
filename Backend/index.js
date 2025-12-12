import express from 'express';
import { port, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();


app.use(express.json());


app.use(cors());

// Custom CORS configuration
// app.use(
//   cors({
//     origin: ['http://localhost:3000', 'https://your-frontend-domain.com'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
//   }));


app.get('/', (req, res) => {
  return res.status(200).send('Book Store API is running!');
});


app.use('/books', booksRoute);


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
