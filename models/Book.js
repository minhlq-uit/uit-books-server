import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
    title: String, 
    description: String,
    image: String,
    price: Number,
    pageNumber: Number,
    availableQuantity: Number,
    boughtQuantity: Number,
    publication_date: Date,
    authorId: String,
    publisherId: String,
    rate: Number,
}, {
    timestamps: true,
});

export const BookModel = mongoose.model('Book', schema);