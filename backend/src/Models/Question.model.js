import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
    {
        shortId: { type: String, required: true, unique: true },
        text: String,
        responses: [{ type: String }]
    });

const Question = mongoose.model('Question', questionSchema);

export default Question;