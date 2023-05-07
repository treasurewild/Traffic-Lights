import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema(
    {
        date: String,
        responses: [{
            type: String
        }]
    });

const questionSchema = new mongoose.Schema(
    {
        shortId: { type: String, required: true, unique: true },
        text: String,
        responses: [responseSchema]
    });

const Question = mongoose.model('Question', questionSchema);

export default Question;