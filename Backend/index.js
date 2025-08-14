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
