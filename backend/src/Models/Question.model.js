import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    _id: { type: String, required: true, unique: true },
    question: String,
    responses: [{ type: String }]
});

const Question = mongoose.model('Question', questionSchema);

export default Question;