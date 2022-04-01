import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
    firstName: String,
    secondName: String,
}, {
    timestamps: true,
});

export const AuthorModel =  mongoose.model('Author', schema);