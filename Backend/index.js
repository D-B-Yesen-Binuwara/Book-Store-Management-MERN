import express from 'express';
import { port, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import {Book} from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
const app = express();

//middleware to parse JSON
app.use(express.json());

//Middleware to handle CORS POLICY

app.use(cors());  // Allow all origins with a default of CORS(*)

// allowing custom origins
// app.use(
//   cors({
//     origin: ['http://localhost:3000', 'https://your-frontend-domain.com'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
//   }));

app.get('/', (req, res) => {
  console.log(req)
  return res.status(234).send('Hello World');
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
