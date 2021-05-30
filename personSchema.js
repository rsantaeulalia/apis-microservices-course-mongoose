import mongoose from 'mongoose';
const {Schema} = mongoose;

const personSchema = new Schema({
    name: String,
    age:  Number,
    favoriteFoods: [String]
})