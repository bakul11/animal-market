import mongoose from "mongoose"

const animalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
})

const animalDB = mongoose.models.animal || mongoose.model('animal', animalSchema);
export default animalDB;