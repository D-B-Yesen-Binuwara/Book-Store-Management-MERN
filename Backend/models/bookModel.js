import mongoose from "mongoose";


const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: String,
            required: true,
            trim: true
        },
        publishYear: {
            type: Number,
            required: true,
            min: 1000,
            max: new Date().getFullYear() + 10
        },
    },
    {
        timestamps: true
    }
);


export const Book = mongoose.model('Book', bookSchema);
