import mongoose from 'mongoose';
import Mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true, unique: true },
        shortId: { type: String, required: true, unique: true },
        learningObjective: String,
        questions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }],
    });

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;